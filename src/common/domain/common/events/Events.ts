import { AggregateAbstract } from '../abstract';
import { UUIDVO } from '../values-objects';
import { EventAbstract } from './EventAbstract';

/**
 * Callback tipado para eventos de domínio
 */
export type DomainEventCallback<E extends EventAbstract = EventAbstract> =
  (event: E) => void;

/**
 * Mapa de handlers por nome do evento
 */
type HandlersMap = Record<
  string,
  Array<DomainEventCallback<EventAbstract>>
>;

/**
 * Events
 *
 * Event Bus de domínio responsável por:
 * - Registrar handlers
 * - Controlar Unit of Work (aggregates com eventos)
 * - Despachar eventos de forma controlada
 *
 * Observação:
 * - Implementação estática por simplicidade
 * - Pode evoluir para serviço injetável futuramente
 */
export class Events {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  /** Handlers registrados por evento */
  private static handlers: HandlersMap = {};

  /** Aggregates com eventos pendentes */
  private static markedAggregates: AggregateAbstract<unknown>[] = [];

  /** Flag de controle (útil para testes) */
  public static shouldRun = true;

  // ---------------------------------------------------------------------------
  // REGISTRATION
  // ---------------------------------------------------------------------------

  /**
   * Registra um handler para um tipo de evento
   */
  public static register<E extends EventAbstract>(
    eventName: string,
    callback: DomainEventCallback<E>,
  ): void {
    const handlers = this.handlers[eventName] ?? [];

    this.handlers[eventName] = [
      ...handlers,
      callback as DomainEventCallback<EventAbstract>,
    ];
  }

  // ---------------------------------------------------------------------------
  // UNIT OF WORK
  // ---------------------------------------------------------------------------

  /**
   * Marca um aggregate para despacho posterior
   * Evita duplicação de aggregates
   */
  public static markAggregateForDispatch(
    aggregate: AggregateAbstract<unknown>,
  ): void {
    const alreadyMarked = this.markedAggregates.some(
      (a) => a.id.equals(aggregate.id),
    );

    if (!alreadyMarked) {
      this.markedAggregates.push(aggregate);
    }
  }

  /**
   * Despacha todos os eventos de um aggregate específico
   */
  public static dispatchEventsForAggregate(id: UUIDVO): void {
    const aggregate = this.findAggregateById(id);

    if (!aggregate || !this.shouldRun) return;

    this.dispatchAggregateEvents(aggregate);
    aggregate.clearEvents();
    this.removeAggregate(aggregate);
  }

  // ---------------------------------------------------------------------------
  // DISPATCH
  // ---------------------------------------------------------------------------

  /**
   * Dispatch direto de um único evento
   * 👉 Ideal para testes de subscribers
   */
  public static dispatchEvent(event: EventAbstract): void {
    if (!this.shouldRun) return;

    this.dispatch(event);
  }

  /**
   * Dispatch de todos os eventos de um aggregate
   */
  private static dispatchAggregateEvents(
    aggregate: AggregateAbstract<unknown>,
  ): void {
    for (const event of aggregate.domainEvents) {
      this.dispatch(event);
    }
  }

  /**
   * Dispatch de um único evento para seus handlers
   */
  private static dispatch(event: EventAbstract): void {
    const eventName = event.constructor.name;
    const handlers = this.handlers[eventName];

    if (!handlers || handlers.length === 0) return;

    for (const handler of handlers) {
      try {
        handler(event);
      } catch (error) {
        // Não engolimos erro de domínio
        // Mantém rastreabilidade e falha explícita
        throw error;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // INTERNAL HELPERS
  // ---------------------------------------------------------------------------

  private static findAggregateById(
    id: UUIDVO,
  ): AggregateAbstract<unknown> | undefined {
    return this.markedAggregates.find((a) => a.id.equals(id));
  }

  private static removeAggregate(
    aggregate: AggregateAbstract<unknown>,
  ): void {
    this.markedAggregates = this.markedAggregates.filter(
      (a) => !a.equals(aggregate),
    );
  }

  // ---------------------------------------------------------------------------
  // CLEANUP (TEST SUPPORT)
  // ---------------------------------------------------------------------------

  /**
   * Limpa todo o estado interno
   * ⚠️ Deve ser usado em afterEach de testes
   */
  public static clearAll(): void {
    this.handlers = {};
    this.markedAggregates = [];
  }
}
