# Enterprise Stack, Complete — Course Plan (Java / Spring / Angular / DevOps / Cloud)

Status: **PLANNED, NOT STARTED**. Companion to `PLAN.md` (web platform course) — shared
infrastructure, lesson anatomy, pipeline and completeness method are defined THERE (sections
2, 4, 5, 6) and reused here; this file defines the 20 enterprise tracks. If starting mid-way:
read PLAN.md sections 2/2b/4/5/6 first, then this file, then the Status Tracker at the bottom.

User-provided topic lists were the MINIMUM. Modules below expand them toward 100% coverage
under the same deep/survey tier system as PLAN.md §2b.

## 1. Completeness Sources (checklists at course-plan/checklists/<track>.json)

- Java: Java Language Specification chapter list + java.base/java.* API package index + JEP index (8→current LTS)
- Spring/Boot/Security/Data: official reference documentation tables of contents
- Hibernate: ORM user guide TOC + JPA (Jakarta Persistence) spec TOC
- Angular: angular.dev API reference index + guide list
- Kafka/RabbitMQ: official docs TOCs
- SQL/PostgreSQL: PostgreSQL docs TOC (SQL commands + concepts chapters)
- AWS: per-service developer guide key-concept lists (scoped to services named below)
- Testing: JUnit 5 / Mockito / Jasmine / Testcontainers docs TOCs
- Security: OWASP Top 10 (current edition) + OWASP cheat-sheet index (scoped)
- Tiering: `deep` = feature-complete; `survey` = one awareness lesson. Non-goals: Scala/Kotlin,
  JavaEE/Jakarta EE beyond JPA/Servlet basics, Azure/GCP (AWS chosen), React/Vue (Angular chosen).

## 2. Lesson Anatomy Deviation (vs PLAN.md §4)

Browser playground impossible for Java/Angular-CLI code. Replacement for non-web-runnable lessons:
**annotated code panel + expected-output panel** (two-column, styled like the playground), plus
"run it yourself" setup note. Everything else in the lesson template stays identical
(concept → visual → code+output → gotchas → exercise → interview Q&A → features-covered footer).

## 3. Tracks and Modules

### Track J1 — Core Java (~22 modules) [theme-java]
1. Setup + language basics: JDK/JRE/JVM, javac/java, syntax, primitives vs references, literals, var, casting/promotion
2. Operators (every one incl. bitwise/shift/instanceof pattern), control flow (all forms, labeled breaks, switch statement AND switch expressions with pattern matching)
3. Strings deep: immutability, pool, String API complete, StringBuilder/StringBuffer, text blocks, formatting
4. Arrays + varargs; java.util.Arrays complete
5. OOP A: classes/objects, constructors, this/static, initializer blocks, access modifiers, packages/imports (incl. static imports)
6. OOP B: inheritance, polymorphism, overloading vs overriding rules, super, final, abstract, Object methods (equals/hashCode contract, toString, clone, finalize deprecation)
7. OOP C: interfaces (default/static/private methods, constants), records (compact constructors, invariants), sealed classes/interfaces, enums complete (fields/methods/abstract methods, EnumSet/EnumMap)
8. Nested types: inner, static nested, local, anonymous; lambdas vs anonymous classes
9. Exceptions: hierarchy, checked vs unchecked, try/catch/finally semantics, try-with-resources + AutoCloseable, multi-catch, custom exceptions, suppressed exceptions, best practices
10. Generics: type parameters, bounded types, wildcards (PECS), erasure + consequences, generic methods, raw types, bridge methods awareness
11. Collections A: Collection hierarchy, List (ArrayList/LinkedList internals), Set (HashSet/LinkedHashSet/TreeSet), equals/hashCode in collections, Iterator/ListIterator, fail-fast vs fail-safe
12. Collections B: Map complete (HashMap internals — buckets/treeification, LinkedHashMap incl. LRU, TreeMap/NavigableMap), Queue/Deque (ArrayDeque, PriorityQueue), Comparator/Comparable (chaining, nullsFirst), Collections/List/Map factory + utility methods, immutable collections
13. Lambdas + functional programming: lambda syntax/scoping, method/constructor references, java.util.function complete (all 40+ interfaces), composition (andThen/compose), closures/effectively-final
14. Streams A: pipeline model, every intermediate op (map/filter/flatMap/mapMulti/peek/sorted/distinct/limit/skip/takeWhile/dropWhile), lazy evaluation
15. Streams B: terminal ops complete, Collectors complete (groupingBy/partitioningBy/teeing/mapping/flatMapping/joining/to*), primitive streams, Optional-returning ops, parallel streams + Spliterator awareness, when NOT to parallelize
16. Concurrency A: Thread lifecycle/API, Runnable/Callable, synchronized (methods/blocks, intrinsic locks), volatile, Java Memory Model (happens-before), wait/notify, ThreadLocal
17. Concurrency B: java.util.concurrent — ExecutorService/thread pools (all factory types, ThreadPoolExecutor params), Future/CompletableFuture complete (composition, error handling), locks (ReentrantLock/ReadWrite/StampedLock), Condition
18. Concurrency C: atomics (all classes, CAS), concurrent collections (ConcurrentHashMap internals, CopyOnWrite*, Blocking queues), synchronizers (CountDownLatch/CyclicBarrier/Semaphore/Phaser/Exchanger), ForkJoinPool
19. Concurrency D (modern): virtual threads (Loom), structured concurrency, scoped values; deadlock/livelock/starvation + detection; common concurrency bugs
20. JVM: architecture, classloading (delegation, custom loaders), bytecode basics, JIT/tiered compilation, memory areas (heap/stack/metaspace/code cache), JEP timeline tour — every language/JVM feature Java 8→current LTS (modules, var, switch expr, records, sealed, pattern matching for switch, virtual threads, FFM…)
21. Memory + GC: object lifecycle, reference types (strong/soft/weak/phantom), GC algorithms (Serial/Parallel/G1/ZGC/Shenandoah — how each works, when each), tuning flags, OOM types, leak patterns + diagnosis
22. Performance + design patterns: profiling (JFR/async-profiler awareness), JMH microbenchmarks, common perf pitfalls; GoF 23 patterns in modern Java (records/lambdas change idioms) + SOLID; anti-patterns

### Track J2 — Advanced Java (~14 modules) [theme-java]
1. Annotations: built-in, meta-annotations, custom annotations, retention/targets, annotation processing (APT) awareness
2. Reflection: Class/Method/Field/Constructor, dynamic invocation, setAccessible + module constraints, dynamic proxies; MethodHandles/VarHandles
3. Serialization: Java serialization (serialVersionUID, readObject/writeObject, pitfalls/vulnerabilities), Externalizable, records + serialization, alternatives (JSON — Jackson deep: ObjectMapper, annotations, custom serializers)
4. Optional: creation/chaining (map/flatMap/filter/or/ifPresentOrElse), anti-patterns, Optional in APIs
5. java.time complete: Instant/LocalDate(Time)/ZonedDateTime/OffsetDateTime, Duration/Period, ZoneId/DST handling, formatting/parsing, TemporalAdjusters, conversion with legacy Date/Calendar, Clock for testability
6. IO classic: streams/readers/writers, buffering, File; NIO.2: Path/Files complete, directory walking, watch service
7. NIO channels: ByteBuffer mechanics, channels, selectors + non-blocking IO model, memory-mapped files
8. Networking: sockets, java.net.http.HttpClient complete (sync/async, HTTP/2, WebSocket)
9. Regex (java.util.regex flavor complete) + text processing (Scanner, BreakIterator awareness)
10. JDBC core: DriverManager/DataSource, PreparedStatement (injection safety), ResultSet, batching, transactions, connection pooling concepts
11. JPMS (modules): module-info, requires/exports/opens, services (ServiceLoader), migration reality
12. Process API, scripting, internationalization (Locale/ResourceBundle/MessageFormat), Foreign Function & Memory API overview
13. Common pitfalls: equals/hashCode traps, autoboxing costs, BigDecimal vs double for money, string concat in loops, date bugs, == vs equals, integer cache, finalizers
14. Clean code: Effective-Java-style item tour (naming, immutability-first, composition over inheritance, minimize accessibility, defensive copies, builder pattern, static factories), Javadoc, code review checklist

### Track S1 — Spring Framework (~14 modules) [theme-spring]
1. IoC/DI concepts, ApplicationContext vs BeanFactory, container bootstrap
2. Bean definition: @Component/@Service/@Repository/@Controller, @Bean/@Configuration, component scanning, stereotype semantics
3. DI mechanics: constructor/setter/field injection, @Autowired resolution, @Qualifier/@Primary, circular dependencies, @Lazy, @Value + property injection
4. Bean lifecycle: scopes (all), lifecycle callbacks (@PostConstruct/@PreDestroy, InitializingBean/DisposableBean), BeanPostProcessor/BeanFactoryPostProcessor, FactoryBean
5. AOP: proxy mechanics (JDK vs CGLIB), aspects/advice types/pointcut expressions, @Transactional under the hood, self-invocation trap
6. SpEL, application events (publish/@EventListener, async events), Environment/PropertySources, profiles (@Profile)
7. Spring MVC A: DispatcherServlet flow, controllers, request mappings, path variables/params/headers, argument resolvers, HttpMessageConverters
8. Spring MVC B: interceptors, filters vs interceptors, static resources, view resolution awareness, multipart handling
9. REST API development: @RestController patterns, ResponseEntity, content negotiation, status code discipline, HATEOAS awareness, API documentation (springdoc/OpenAPI)
10. Validation: Bean Validation complete (every constraint annotation, groups, custom validators, cascading), @Validated vs @Valid, error binding
11. Exception handling: @ExceptionHandler/@ControllerAdvice, ProblemDetail (RFC 7807), error response design
12. Transactions: @Transactional complete (propagation — all 7, isolation, rollback rules, readOnly), programmatic transactions, pitfalls
13. Logging (SLF4J/Logback config, MDC), caching abstraction (@Cacheable et al), scheduling (@Scheduled/cron) + async (@Async, executors)
14. Testing in Spring: TestContext framework, context caching, @MockBean, MockMvc deep, transactional tests; WebFlux/reactive stack survey lesson

### Track S2 — Spring Boot (~12 modules) [theme-spring]
1. Boot architecture: starters, @SpringBootApplication, SpringApplication lifecycle, embedded servers (Tomcat/Jetty/Undertow), fat/layered jars
2. Auto-configuration internals: @Conditional* family, AutoConfiguration.imports, ordering, excluding/overriding, debugging with condition evaluation report; writing a custom starter
3. Configuration: application.properties/YAML, relaxed binding, @ConfigurationProperties (validation, records), profiles per environment, config precedence order (complete list), externalized config
4. RESTful service design: resource modeling, DTO layer + MapStruct/manual mappers, request/response design, null-handling policy
5. Persistence wiring: DataSource auto-config, HikariCP tuning basics, Spring Data JPA repositories intro (deep coverage in Track H1)
6. Pagination and sorting: Pageable/Sort/Page vs Slice, web support, stable sort keys, keyset pagination awareness
7. API versioning strategies (URI/header/media-type, deprecation policy) + API evolution/backward compatibility
8. Global exception handling: end-to-end error architecture, validation errors, ProblemDetail responses, error catalogs
9. File upload/download: multipart config, streaming large files, Resource abstraction, content disposition, storage strategies
10. Scheduling + async processing in Boot, application events, ApplicationRunner/CommandLineRunner, graceful shutdown
11. Actuator: every built-in endpoint, exposure config, custom endpoints/health indicators/info contributors, Micrometer metrics intro
12. Boot 3.x specifics: Jakarta namespace, native image/GraalVM awareness, DevTools, banner/logging config, packaging + running in prod

### Track S3 — Spring Security (~10 modules) [theme-spring]
1. Architecture: filter chain (every default filter's job), SecurityContext/SecurityContextHolder, AuthenticationManager/Provider, UserDetailsService
2. Authentication: form login, HTTP basic, remember-me, session management (fixation, concurrency), logout handling
3. Password storage: PasswordEncoder implementations (BCrypt/Argon2/scrypt/PBKDF2), DelegatingPasswordEncoder, upgrade strategies
4. Authorization: URL-based rules, method security (@PreAuthorize/@PostAuthorize/@Secured), roles vs authorities, hierarchical roles, SpEL in security
5. JWT deep: structure, signing (HMAC vs RSA/EC), validation, refresh token patterns, storage tradeoffs (cookie vs header), stateless architecture, revocation strategies
6. OAuth2/OIDC: flows (auth code + PKCE, client credentials), Spring as OAuth2 client, as resource server (JWT/opaque), authorization server awareness, social login
7. CSRF (when needed in SPA vs server-rendered) + CORS (Spring config, preflight mechanics)
8. Securing REST APIs end-to-end: security headers, rate limiting hookup, input hardening, multi-tenant authorization patterns
9. Common vulnerabilities and fixes in Spring apps (mapped to OWASP), security testing (@WithMockUser, SecurityMockMvc)
10. Case study: full auth system — registration, login, JWT + refresh, roles, password reset, account lockout

### Track H1 — Hibernate and JPA (~14 modules) [theme-java]
1. ORM concepts, JPA vs Hibernate, EntityManager/persistence context, entity states + state transitions
2. Entity mapping: @Entity/@Table/@Id, ID generation strategies (IDENTITY/SEQUENCE/TABLE/UUID — tradeoffs), @Column, enums, @Embedded/@Embeddable, attribute converters, large objects
3. Relationships A: @OneToOne/@ManyToOne/@OneToMany (owning side, mappedBy, join columns/tables)
4. Relationships B: @ManyToMany (+ join entity pattern), unidirectional vs bidirectional, helper methods, equals/hashCode for entities
5. Inheritance strategies (SINGLE_TABLE/JOINED/TABLE_PER_CLASS/@MappedSuperclass) + polymorphic queries
6. JPQL complete: select/joins/fetch joins/aggregation/subqueries/functions/named queries/DTO projections (constructor expressions)
7. Criteria API + Spring Data Specifications; native queries + result mapping
8. Fetching: LAZY vs EAGER (defaults per relation), LazyInitializationException anatomy, JOIN FETCH, @EntityGraph, batch size
9. N+1: detection (SQL logging, Hypersistence awareness), every fix compared
10. Transactions + locking: optimistic (@Version) vs pessimistic, lock modes, isolation interplay, dirty checking/flush modes
11. Caching: first-level, second-level (providers, concurrency strategies), query cache, when caching hurts
12. Cascade types (all) + orphanRemoval vs CascadeType.REMOVE; batch inserts/updates, StatelessSession awareness
13. Spring Data JPA deep: repository hierarchy, derived query methods (full grammar), @Query/@Modifying, projections (interface/class/dynamic), auditing, pagination integration
14. Performance tuning + migrations: statement logging/statistics, common slow patterns, connection pool sizing, Flyway/Liquibase (versioned migrations, repeatable, rollback strategy)

### Track M1 — Microservices (~12 modules) [theme-arch]
1. Monolith vs microservices: real tradeoffs, modular monolith option, when NOT to do microservices
2. Decomposition: DDD-lite (bounded contexts, aggregates), decomposition by capability/subdomain, strangler fig migration
3. Data per service: shared-nothing, reporting across services, eventual consistency intro
4. Inter-service communication: REST vs gRPC vs messaging, sync vs async tradeoffs, API contracts, client generation
5. API gateway: routing/auth/rate-limiting at edge, Spring Cloud Gateway, BFF pattern
6. Service discovery: client vs server side, Eureka/Consul, Kubernetes-native discovery
7. Centralized configuration: Spring Cloud Config, K8s ConfigMaps/Secrets, dynamic refresh, secret rotation awareness
8. Resilience: Resilience4j complete — circuit breaker (states/config), retry + backoff + jitter, timeout, bulkhead, rate limiter, fallbacks; combining patterns correctly
9. Distributed data patterns: saga (choreography vs orchestration), outbox + CDC, idempotency keys, exactly-once myth
10. CQRS + event sourcing (awareness→working example), read models
11. Distributed tracing + correlation (deep dive lives in Track O1), debugging across services
12. Versioning/backward compatibility, consumer-driven contracts, deployment topologies, service mesh survey (Istio/Linkerd), testing strategy for microservices

### Track M2 — Messaging and Event-Driven Systems (~10 modules) [theme-arch]
1. Messaging fundamentals: queues vs pub-sub, delivery guarantees (at-most/at-least/exactly-once), idempotent consumers, poison messages
2. Kafka A: architecture (brokers/topics/partitions/offsets/replication, KRaft), when Kafka vs queue broker
3. Kafka B: producers (acks/idempotence/batching/compression/partitioners), consumers (groups/rebalancing/offset commit strategies)
4. Kafka C: transactions + EOS semantics, compacted topics, retention, schema registry + Avro/Protobuf, Kafka Streams + Connect survey
5. Spring Kafka: listeners, error handlers, retry topics, DLT, testing with EmbeddedKafka/Testcontainers
6. RabbitMQ A: AMQP model — exchanges (direct/topic/fanout/headers), queues, bindings, routing keys
7. RabbitMQ B: acknowledgements/prefetch, TTL, DLX, priority/lazy queues, quorum queues, clustering awareness; Spring AMQP
8. Dead-letter handling + retries: backoff strategies, parking-lot pattern, alerting on DLQ
9. Ordering: per-key ordering, partition strategies, reordering hazards, concurrency vs ordering tradeoff
10. Event-driven architecture: event notification vs event-carried state vs event sourcing, event schema design/versioning, choreography case study

### Track D1 — Databases (~14 modules) [theme-db]
1. Relational model + PostgreSQL/MySQL setup (PostgreSQL primary), psql, data types (incl. JSONB/arrays/UUID)
2. SQL DDL: CREATE/ALTER/DROP, constraints (PK/FK/UNIQUE/CHECK/NOT NULL/DEFAULT), sequences/identity
3. SQL DML + queries: INSERT (incl. ON CONFLICT upsert)/UPDATE/DELETE/RETURNING, SELECT anatomy, WHERE operators, ORDER/LIMIT/OFFSET, DISTINCT
4. Joins complete: INNER/LEFT/RIGHT/FULL/CROSS/SELF/LATERAL, join algorithms (nested loop/hash/merge), USING/NATURAL awareness
5. Aggregation: GROUP BY/HAVING, every aggregate function, FILTER, GROUPING SETS/ROLLUP/CUBE
6. Subqueries + CTEs: scalar/correlated/EXISTS/IN vs JOIN, WITH, recursive CTEs; set operations
7. Window functions complete: OVER/PARTITION BY/frames, ranking/offset/aggregate windows, use cases
8. Indexing deep: B-tree mechanics, composite (column order!), covering/partial/expression indexes, GIN/GiST awareness, index-only scans, when indexes hurt
9. Query optimization: EXPLAIN (ANALYZE) reading, planner behavior, statistics, common rewrite patterns, pagination at scale (keyset)
10. Transactions: ACID, isolation levels + anomalies matrix (dirty/non-repeatable/phantom/serialization), MVCC, locking (row/table, deadlocks), SELECT FOR UPDATE
11. Design: normalization 1NF→BCNF with worked examples, denormalization tradeoffs, schema design patterns (soft delete, audit columns, multi-tenancy options)
12. Views/materialized views, stored procedures/triggers basics, partitioning awareness, connection pooling (HikariCP sizing)
13. Redis: data structures (string/hash/list/set/zset/stream), caching patterns (cache-aside/write-through), TTL/eviction policies, pipelines/transactions, pub/sub, persistence (RDB/AOF), distributed lock caveats, Spring Data Redis
14. NoSQL taxonomy: document/key-value/wide-column/graph — when each; MongoDB working intro; CAP/PACELC; polyglot persistence decision framework

### Track A1 — Angular Basics (~10 modules) [theme-angular]
1. Architecture + CLI: workspace anatomy, standalone components (modern default) AND NgModules (legacy reality), bootstrap flow, angular.json
2. Components: decorator metadata, lifecycle hooks (all 8 + afterRender hooks), component queries intro
3. Templates: interpolation, new control flow (@if/@for with track/@switch/@let/@defer) AND structural directive syntax (*ngIf/*ngFor legacy), ng-template/ng-container/ng-content (projection, multi-slot)
4. Data binding: property/attribute/class/style bindings, event binding, two-way ([(ngModel)] + custom two-way), input()/output() signal functions AND @Input/@Output
5. Directives: attribute vs structural, built-ins complete, writing custom directives (host bindings/listeners), directive composition API
6. Pipes: every built-in (async/date/number/currency/percent/json/keyvalue/slice/i18n pipes), custom pipes, pure vs impure
7. Services + DI: injectable, provider types (class/value/factory/existing), injection tokens, hierarchical injector tree, inject() function, resolution modifiers (@Optional/@Self/@SkipSelf/@Host)
8. Routing A: Routes config, routerLink/router-outlet, path params/query params, child + nested routes, wildcard/redirects
9. Routing B: router events, navigation extras, named outlets, route data, scroll restoration
10. Signals intro: signal/computed/effect basics, signals vs zone change detection — mental model (deep coverage A2)

### Track A2 — Angular Advanced (~14 modules) [theme-angular]
1. Reactive forms A: FormControl/FormGroup/FormArray/FormBuilder, typed forms, value/status streams
2. Reactive forms B: every built-in validator, custom sync/async validators, cross-field validation, dynamic forms, ControlValueAccessor (custom form controls)
3. Template-driven forms: ngModel/ngForm mechanics, when acceptable, comparison
4. HttpClient: typed requests, params/headers/context, progress events, error handling patterns, retry strategies
5. RxJS A: Observable contract, creation operators, subjects (Subject/Behavior/Replay/Async), hot vs cold, multicasting (share/shareReplay)
6. RxJS B: transformation/filtering/combination operators (full practical set), higher-order mapping (switchMap/mergeMap/concatMap/exhaustMap — decision matrix), error operators, schedulers awareness
7. RxJS C: subscription management, takeUntilDestroyed/DestroyRef, common leak patterns, marble diagrams, testing observables
8. Interceptors (functional + class), auth token flow, caching/logging/error interceptors, ordering
9. Guards + resolvers (functional style), CanActivate/CanMatch/CanDeactivate, route-level auth UX
10. Lazy loading: route-level code splitting, loadComponent/loadChildren, preloading strategies (+custom), @defer triggers deep
11. Change detection deep: Zone.js mechanics, OnPush rules, markForCheck/detectChanges, signals-driven CD, zoneless Angular
12. Signals deep: linkedSignal, resource()/rxResource, toSignal/toObservable interop, signal-based components, effects discipline
13. Performance: profiling, trackBy/track, virtual scrolling (CDK), image optimization (NgOptimizedImage), bundle analysis, hydration + SSR (Angular Universal, incremental hydration)
14. Ecosystem essentials: i18n, animations API, CDK survey (overlay/portal/a11y/drag-drop), Angular Elements, accessibility patterns, upgrade/migration strategy

### Track A3 — Angular State Management (~8 modules) [theme-angular]
1. Component communication matrix: input/output, viewChild/contentChild (signal queries), service-mediated, router state — choosing correctly
2. Shared services with subjects/signals: store-lite pattern, immutability discipline
3. NgRx foundations: redux principles, Store/actions (createActionGroup)/reducers (createReducer), state shape design
4. Selectors: createSelector memoization, composing, view models, entity adapter (@ngrx/entity)
5. Effects: side-effect discipline, common patterns (load/optimistic update), error handling in effects, action lifecycle
6. NgRx ergonomics: facades, functional creators, devtools, router-store; testing store/effects/selectors
7. Modern alternatives: @ngrx/component-store, @ngrx/signal-store (deep — the current direction), comparison
8. Best practices: what belongs in global vs local state, when NgRx is overkill, migration paths; capstone state design exercise

### Track T1 — Frontend Testing (~8 modules) [theme-angular]
1. Testing philosophy + pyramid for SPAs, what to test at which layer
2. Jasmine complete: describe/it/expect, every matcher, spies (all forms), async patterns (fakeAsync/tick/waitForAsync), beforeEach discipline
3. Karma config + TestBed: configureTestingModule, standalone component testing, fixtures, DebugElement/By, detectChanges mechanics
4. Component testing deep: DOM interaction, inputs/outputs, projected content, host components, component harnesses (CDK)
5. Service + HTTP testing: HttpClientTestingModule/HttpTestingController, DI overrides, mocking strategies
6. Directive/pipe/router/guard testing; NgRx testing (MockStore, effects marble tests)
7. E2E: Playwright (primary) — selectors/fixtures/network interception/trace viewer; Cypress awareness; component tests vs e2e
8. Strategy: mocking APIs (MSW awareness), test data builders, flake control, coverage targets, CI wiring

### Track T2 — Backend Testing (~10 modules) [theme-java]
1. JUnit 5 A: architecture (platform/jupiter/vintage), lifecycle, assertions complete, assumptions, display names/tags/ordering
2. JUnit 5 B: parameterized tests (every source type), nested tests, dynamic tests, extensions model, temp dirs, parallel execution
3. AssertJ fluent assertions complete; Hamcrest awareness
4. Mockito A: mocks vs stubs vs spies, when/thenReturn vs doReturn, argument matchers discipline
5. Mockito B: ArgumentCaptor, verify modes, BDDMockito, static/constructor mocking, strictness, inline mock maker, anti-patterns (don't mock value objects)
6. Spring test slices: @WebMvcTest + MockMvc deep, @DataJpaTest (+ TestEntityManager), @JsonTest, @RestClientTest, slice vs @SpringBootTest tradeoffs
7. Integration testing: @SpringBootTest (webEnvironment modes), TestRestTemplate/WebTestClient, test profiles/config, transactional rollback pitfalls
8. Testcontainers deep: PostgreSQL/Kafka/Redis containers, singleton container pattern, @ServiceConnection, CI performance
9. Contract testing: consumer-driven contracts, Spring Cloud Contract AND Pact — full workflow both sides
10. Strategy for microservices: test pyramid per service, test data management, coverage (JaCoCo), mutation testing (PIT), performance test awareness (Gatling), flaky test policy

### Track O1 — DevOps and Deployment (~14 modules) [theme-devops]
1. Git A: object model (blobs/trees/commits), staging, every daily command, .gitignore, diff mastery
2. Git B: merge vs rebase (+ interactive), conflict resolution, cherry-pick, stash, tags, reflog recovery, bisect, hooks, submodules/worktrees awareness
3. GitHub: PR workflow, code review practice, protected branches, CODEOWNERS, issues/projects, releases
4. Branching strategies: trunk-based vs GitFlow vs GitHub Flow — tradeoffs, versioning (SemVer), conventional commits + changelog automation
5. Maven: POM anatomy, lifecycle/phases/goals, dependency mediation + BOM/dependencyManagement, multi-module builds, profiles, essential plugins, wrapper
6. Gradle: build.gradle(.kts), tasks, dependency configurations, multi-project, version catalogs, Maven comparison
7. Docker A: images/layers/registries, Dockerfile instruction set complete, build context, .dockerignore
8. Docker B: multi-stage builds for Java (jlink/layered Boot jars) and Angular (nginx serve), networking, volumes, resource limits, healthchecks, image scanning, distroless/JRE base image choice
9. Docker Compose: full-stack local environment (Postgres+Redis+Kafka+services), profiles, healthcheck-based startup ordering, override files
10. Kubernetes A: architecture, Pods/ReplicaSets/Deployments, Services (ClusterIP/NodePort/LoadBalancer), namespaces, kubectl fluency
11. Kubernetes B: ConfigMaps/Secrets, probes (liveness/readiness/startup), resource requests/limits, HPA, Ingress, rolling updates/rollbacks, StatefulSets/Jobs/CronJobs awareness, Helm basics
12. CI/CD concepts: pipeline stages, quality gates, artifact management, environment promotion
13. GitHub Actions deep: workflow syntax complete, matrix builds, caching, secrets/environments, reusable workflows, building+testing+publishing the full stack; Jenkins survey (Jenkinsfile basics)
14. Deployment strategies: rolling/blue-green/canary/feature flags, database migrations in CD, rollback discipline, environment management (dev/stage/prod parity)

### Track C1 — Cloud AWS (~12 modules) [theme-cloud]
1. Cloud concepts + AWS global infrastructure (regions/AZs), shared responsibility, account hygiene, free tier care
2. IAM deep: users/groups/roles/policies (policy JSON reading), least privilege, instance profiles, STS/assume-role, identity center awareness
3. EC2: instance types, AMIs, user data, key pairs, EBS, security groups, placement basics, pricing models (on-demand/reserved/spot)
4. S3: buckets/objects, storage classes + lifecycle, versioning, encryption options, bucket policies vs ACLs, presigned URLs, static hosting, event notifications
5. VPC fundamentals: subnets (public/private), route tables, IGW/NAT, security groups vs NACLs, endpoints awareness
6. RDS: engines, Multi-AZ vs read replicas, backups/snapshots, parameter groups, Aurora overview, connecting Spring Boot securely
7. Load balancing + scaling: ALB/NLB (target groups, health checks, path routing), Auto Scaling groups + policies
8. Containers/serverless on AWS: ECS/Fargate deploy of our stack, ECR, EKS awareness; Lambda (triggers, cold starts, Java on Lambda), API Gateway, SQS/SNS/EventBridge
9. Caching + DNS + CDN: ElastiCache (Redis), Route 53, CloudFront (serving the Angular app)
10. Monitoring in cloud: CloudWatch (metrics/logs/alarms/dashboards), X-Ray awareness, cost monitoring/budgets
11. IaC: CloudFormation concepts, Terraform working intro (state, plan/apply, modules) — deploy the stack via IaC
12. Well-Architected pillars tour + reference deployment: full app (ALB + ECS + RDS + ElastiCache + S3/CloudFront) end-to-end

### Track Y1 — System Design (~14 modules) [theme-arch]
1. Foundations: latency numbers, throughput vs latency, back-of-envelope estimation method, requirements gathering (functional/NFR)
2. Scaling basics: vertical vs horizontal, stateless services, session externalization, 12-factor app
3. Load balancing: L4 vs L7, algorithms (RR/least-conn/consistent hashing), health checks, global LB/geo-DNS
4. Caching: every layer (browser/CDN/gateway/app/db), invalidation strategies, cache stampede protections, cache coherence problems
5. Rate limiting: token bucket/leaky bucket/fixed/sliding window — implementations, distributed rate limiting, client fairness
6. Database scaling: replication (sync/async, failover), sharding (range/hash/directory, resharding pain, consistent hashing), federation, hot partition handling
7. Consistency + availability: CAP/PACELC properly, consistency models (strong/eventual/causal/RYW), quorums, leader election awareness
8. High availability + fault tolerance: redundancy math (nines), failure domains, graceful degradation, backpressure, timeout budgets, retry storms, chaos engineering awareness
9. API design: REST maturity/idempotency/pagination/filtering/versioning, gRPC, GraphQL survey, webhooks, real-time (WebSocket/SSE/long-polling — choosing)
10. Async architectures: queue-based load leveling, fan-out, scheduled/batch vs stream processing, exactly-once revisited
11. Storage systems: blob storage design, time-series/search (Elasticsearch survey), metadata + content separation, CDC pipelines
12. Classic designs A: URL shortener, distributed rate limiter, notification system, chat system
13. Classic designs B: news feed, e-commerce checkout + inventory, payment flow (idempotency deep), video platform basics
14. Enterprise application design: layered vs hexagonal/clean architecture, modular monolith design, ADRs, diagramming (C4), interview method (framework + mock walkthroughs)

### Track O2 — Observability (~8 modules) [theme-devops]
1. Three pillars + observability vs monitoring, instrumentation strategy
2. Logging best practices: structured JSON logs, levels discipline, MDC/correlation IDs, what never to log, sampling; Logback config deep
3. Log aggregation: ELK/EFK awareness, Loki awareness, log-based debugging workflow
4. Metrics: Micrometer deep (counters/gauges/timers/distribution summaries, tags cardinality dangers), Prometheus (scraping, PromQL basics), RED/USE methods
5. Dashboards + Grafana: dashboard design, template variables, alert visualization
6. Health checks: liveness vs readiness semantics (K8s interplay), Actuator health groups, dependency health, synthetic checks
7. Distributed tracing: OpenTelemetry (SDK/collector, W3C trace context), spans/baggage, sampling strategies, Zipkin/Jaeger/Tempo, tracing async + messaging flows
8. Error tracking + alerting: Sentry-style grouping awareness, SLI/SLO/error budgets, alert design (symptom-based, fatigue avoidance), on-call runbooks; JFR/continuous profiling in prod

### Track Y2 — Secure Coding (~10 modules) [theme-arch]
1. Threat modeling basics (STRIDE-lite), security mindset, defense in depth
2. OWASP Top 10 tour (current edition) — each category with Java/Angular examples
3. Injection: SQLi (prepared statements/JPA safety), command/LDAP/log injection, ORM-specific pitfalls
4. XSS in SPA context: Angular's sanitization model, bypassSecurityTrust* discipline, CSP for SPAs, DOM XSS
5. AuthN/AuthZ failures: session vs token pitfalls, IDOR/broken object-level auth, function-level auth, multi-tenancy isolation
6. CSRF/SSRF/deserialization: mechanics + Java-specific gadget awareness + defenses
7. Secrets management: never-in-git, env vars vs vaults (Vault/AWS Secrets Manager), rotation, .env hygiene, key management basics (TLS, hashing vs encryption, salts/peppers)
8. Input validation + file handling: allow-list validation, canonicalization, path traversal, upload hardening (type/size/content sniffing), safe zip extraction
9. Supply chain: dependency scanning (OWASP Dependency-Check/Snyk awareness), lockfiles, container scanning, SBOM awareness, CI security gates
10. Secure API design review: checklist-driven audit of a real service, security headers complete, rate limiting, audit logging, pen-test awareness (SAST/DAST)

### Track P1 — Real-World Projects (~10 capstones) [theme-arch]
Ordered starter → flagship. Each capstone: feature spec, architecture doc, data model, API contract,
build phases, and "which track modules it exercises" map.
1. Expense tracker (starter: Boot + JPA + Angular basics + auth)
2. Admin dashboard (Angular focus: signals, charts, RBAC UI, testing)
3. Inventory system (transactions, concurrency, reporting SQL)
4. Job portal (search/filtering/pagination at scale, file uploads, emails)
5. HR management system (workflows, roles deep, audit logging)
6. Stock market dashboard (WebSockets/SSE, Redis, real-time Angular)
7. Banking application (security flagship: JWT+OAuth2, idempotent transfers, ledger modeling, audit)
8. E-commerce application (full-stack flagship: catalog/cart/checkout/payments/inventory)
9. Microservices refactor of e-commerce (gateway, Kafka events, sagas, resilience, tracing)
10. Cloud enterprise deployment (IaC, K8s, CI/CD, observability stack, DR drill) — the graduation project

## 4. Site Integration

- Files: `site/courses/<track-slug>/...` — same convention as PLAN.md §5
- Track slugs: `core-java`, `advanced-java`, `spring`, `spring-boot`, `spring-security`,
  `hibernate-jpa`, `microservices`, `messaging`, `databases`, `angular-basics`, `angular-advanced`,
  `angular-state`, `frontend-testing`, `backend-testing`, `devops`, `aws`, `system-design`,
  `observability`, `secure-coding`, `projects`
- New theme classes (add to site.css + theming.md): `theme-java` (warm orange-red),
  `theme-spring` (leaf green), `theme-angular` (crimson), `theme-db` (indigo),
  `theme-devops` (cyan), `theme-cloud` (amber), `theme-arch` (slate)
- Index: "Courses" menu gains an "Enterprise Stack" group beside the web-platform tracks

## 5. Build Order

Prereq: web-platform PLAN.md Phase 0 infra (shared). Then phases here are sequential but
independent of the web course phases — the two courses can interleave by user choice:
- **Phase E1:** J1 Core Java → J2 Advanced Java
- **Phase E2:** D1 Databases (early — everything depends on it)
- **Phase E3:** S1 Spring → S2 Boot → H1 JPA → S3 Security
- **Phase E4:** T2 Backend Testing
- **Phase E5:** A1 → A2 → A3 Angular + T1 Frontend Testing
- **Phase E6:** M1 Microservices → M2 Messaging
- **Phase E7:** O1 DevOps → C1 AWS → O2 Observability
- **Phase E8:** Y1 System Design → Y2 Secure Coding
- **Phase E9:** P1 Projects (interleaved once prereq tracks done; expense tracker can start after E3)

Scale estimate: ~250 modules ≈ 600+ lessons. Ship per-batch as always.

## 6. Status Tracker

- [ ] Shared Phase 0 infra (see PLAN.md) + this plan's themes/checklists scaffolds
- [ ] E1: J1 (0/22), J2 (0/14)
- [ ] E2: D1 (0/14)
- [ ] E3: S1 (0/14), S2 (0/12), H1 (0/14), S3 (0/10)
- [ ] E4: T2 (0/10)
- [ ] E5: A1 (0/10), A2 (0/14), A3 (0/8), T1 (0/8)
- [ ] E6: M1 (0/12), M2 (0/10)
- [ ] E7: O1 (0/14), C1 (0/12), O2 (0/8)
- [ ] E8: Y1 (0/14), Y2 (0/10)
- [ ] E9: P1 (0/10)

## 7. Decisions Already Made (do not relitigate)

- Same lesson anatomy/pipeline/tier system as PLAN.md; only the playground is replaced by
  code+output panels for non-browser-runnable lessons (§2)
- PostgreSQL over MySQL as primary; AWS over Azure/GCP; Angular (no React/Vue); Playwright primary e2e
- Kafka AND RabbitMQ both deep (different models, both interview-standard)
- Java LTS-current baseline; JEP timeline lesson keeps feature coverage forward-compatible
- Projects are checklist consumers, not new features: every capstone maps to module ids it exercises
