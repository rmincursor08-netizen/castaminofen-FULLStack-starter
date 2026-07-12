# طراحی کامل معماری نرم‌افزار پلتفرم

تاریخ: 2026-07-12
حوزه: معماری کامل برای یک پلتفرم رسانه/سازنده با رشد بلندمدت، با تمرکز بر نگهداری‌پذیری، ماژولار بودن، مقیاس‌پذیری، مشاهده‌پذیری و امکان تکامل به سمت خدمات میکرو.

## 1. جمع‌بندی راهبردی

این معماری از یک معماری مدولار-مونولیت شروع می‌کند، نه از یک پراکندگی زودهنگام به میکروسرویس‌ها. دلیل این انتخاب این است که در ابتدای مسیر، نیاز به سرعت توسعه، سادگی عملیات، کاهش هزینه‌ی نگهداری و حفظ مرزهای واضح دامنه وجود دارد. در عین حال، ساختار به‌گونه‌ای طراحی شده که هر ماژول از نظر قرارداد، داده و جریان رویداد، مستقل و قابل جداسازی باشد.

این معماری به‌جای یک لایه‌بندی سنتی ساده، از مدل زیر استفاده می‌کند:

- لبه و ورود: API Gateway، WAF، CDN، AuthN/AuthZ
- لایه‌ی دامنه: ماژول‌های مستقل با مالکیت داده
- لایه‌ی پلتفرم: پایگاه داده، کش، ذخیره‌سازی، جستجو، رویداد، اعلان، تحلیل
- لایه‌ی جریان‌های عملیاتی: پردازش رسانه، AI،推薦، اعلان و جستجو

## 2. اصول اصلی طراحی

1. مالکیت دامنه در سطح ماژول
   - هر ماژول داده، قرارداد و چرخه عمر خود را دارد.
   - هیچ ماژولی نباید به‌طور مستقیم به دیتای ماژول دیگری دسترسی داشته باشد.

2. رویدادمحور بودن به‌جای وابستگی مستقیم
   - بین ماژول‌ها از رویدادها و قراردادهای نسخه‌دار استفاده می‌شود.
   - این موضوع باعث کاهش coupling و بهبود استقلال می‌شود.

3. لبه‌ی مشترک، نه منطق کسب‌وکار در دروازه
   - Gateway فقط ورود، احراز هویت، مسیریابی، throttling و versioning را انجام می‌دهد.

4. رسانه و AI به‌عنوان زیرسیستم‌های جداگانه
   - بارگذاری، پردازش، ترنس‌کدینگ و تحلیل تصویر/صدا به‌صورت جداگانه و قابل مقیاس‌سازی پیاده‌سازی می‌شود.

5. مشاهده‌پذیری و کنترل‌های امنیتی از ابتدا
   - همه‌ی سطوح لاگ، متریک، trace و سیاست‌های امنیتی دارند.

## 3. معماری سطح بالا (High Level Architecture)

```mermaid
flowchart LR
    U[کاربر] --> W[اپ وب]
    C[سازنده] --> M[اپ موبایل]
    A[ادمین] --> Admin[کنسول مدیریت]

    W --> G[API Gateway]
    M --> G
    Admin --> G

    G --> Auth[سرویس احراز هویت]
    G --> User[سرویس کاربران]
    G --> Creator[سرویس سازندگان]
    G --> Content[سرویس محتوا]
    G --> Media[سرویس رسانه]
    G --> Pay[سرویس پرداخت]
    G --> Search[سرویس جستجو]
    G --> Rec[سرویس توصیه]
    G --> Noti[سرویس اعلان]
    G --> AI[سرویس AI]

    Auth --> DB[(PostgreSQL)]
    User --> DB
    Creator --> DB
    Content --> DB
    Pay --> DB
    Media --> OBJ[(Object Storage)]
    Media --> Queue[(Event Bus)]
    Content --> Queue
    Pay --> Queue
    Search --> Queue
    Rec --> Queue
    Noti --> Queue
    AI --> Queue
    Media --> CDN[CDN]
    Media --> Cache[(Redis)]
    Search --> SearchStore[(Search Engine)]
    Rec --> FeatureStore[(Feature Store)]
```

### دلیل انتخاب این ساختار
- کلاینت‌ها فقط به یک لبه‌ی مشترک متصل می‌شوند تا تغییرات در سمت سرور تأثیر کمتری روی سمت کاربر داشته باشد.
- هر ماژول از طریق قراردادهای شفاف برای تعامل با دیگر ماژول‌ها آماده است.
- این معماری برای رشد به سمت خدمات جداگانه، بدون بازنویسی کلی، قابل تکامل است.

## 4. دیاگرام Context Diagram

```mermaid
flowchart TD
    User[کاربر نهایی] --> Platform[پلتفرم رسانه/سازنده]
    Creator[سازنده] --> Platform
    Admin[ادمین] --> Platform
    Platform --> Storage[ذخیره‌سازی رسانه]
    Platform --> Payment[درگاه پرداخت]
    Platform --> Email[سرویس ایمیل]
    Platform --> Push[سرویس پوش نوتیفیکیشن]
    Platform --> SearchEngine[موتور جستجو]
    Platform --> AIEngine[موتور AI]
```

### چرا این مدل مناسب است
- مرزهای خارجی سیستم دقیق مشخص شده‌اند.
- وابستگی‌های خارجی از قلب کسب‌وکار جدا شده‌اند.
- در آینده می‌توان این وابستگی‌ها را با Providerهای جایگزین تعویض کرد.

## 5. دیاگرام Container Diagram

```mermaid
flowchart LR
    Client[Client Apps] --> Gateway[API Gateway]
    Gateway --> Auth[Auth Service]
    Gateway --> Domain[Domain Modules]
    Domain --> DB[(Transactional DB)]
    Domain --> Cache[(Redis)]
    Domain --> Storage[(Object Storage)]
    Domain --> Bus[(Event Bus)]
    Bus --> SearchSvc[Search Service]
    Bus --> RecoSvc[Recommendation Service]
    Bus --> NotifySvc[Notification Service]
    Bus --> AISvc[AI Service]
    SearchSvc --> SearchEngine[(OpenSearch)]
    RecoSvc --> FeatureStore[(Feature Store)]
    NotifySvc --> Providers[(Email/Push/Webhook)]
    MediaSvc[Media Service] --> Storage
    MediaSvc --> Bus
    MediaSvc --> CDN[CDN]
```

### تصمیم معماری در این بخش
- API Gateway یک لبه‌ی مشترک است، نه یک «سرویس کسب‌وکار».
- پایگاه داده‌ی تراکنشی برای داده‌های اصلی، کش برای سرعت، و Object Storage برای رسانه‌های حجیم جدا شده‌اند.
- هر سرویس/ماژول دارای کانتینر مستقل و قابل استقرار است.

## 6. دیاگرام Component Diagram

```mermaid
flowchart TD
    subgraph API
      Controller[Controllers / REST APIs]
      Authz[Auth Guards]
      RateLimit[Rate Limiting]
      Validator[Validation]
    end

    subgraph CoreModule
      UseCase[Use Cases]
      DomainModel[Domain Model]
      Ports[Ports / Contracts]
    end

    subgraph Infra
      Repo[Repository]
      CacheAdapter[Cache Adapter]
      StorageAdapter[Storage Adapter]
      EventPublisher[Event Publisher]
    end

    Controller --> Authz
    Controller --> Validator
    Controller --> UseCase
    UseCase --> DomainModel
    UseCase --> Ports
    Ports --> Repo
    Ports --> CacheAdapter
    Ports --> StorageAdapter
    Ports --> EventPublisher
```

### دلیل طراحی این لایه
- ماژول‌ها از الگوی ports-and-adapters استفاده می‌کنند تا در آینده امکان جایگزینی زیرساخت وجود داشته باشد.
- منطق دامنه و لایه‌ی زیرساخت از هم جدا شده‌اند.
- این ساختار برای تست‌پذیری و نگهداری بسیار مناسب است.

## 7. دیاگرام Module Diagram

```mermaid
flowchart TB
    subgraph Modules
      M1[Authentication Module]
      M2[User Module]
      M3[Creator Module]
      M4[Content Module]
      M5[Media Module]
      M6[Payment Module]
      M7[Search Module]
      M8[Recommendation Module]
      M9[Notification Module]
      M10[AI Module]
    end

    M1 --> Shared[Shared Contracts]
    M2 --> Shared
    M3 --> Shared
    M4 --> Shared
    M5 --> Shared
    M6 --> Shared
    M7 --> Shared
    M8 --> Shared
    M9 --> Shared
    M10 --> Shared
```

### چرا ماژول‌ها جدا شده‌اند
- هر ماژول حوزه‌ی مسئولیت مشخصی دارد.
- در صورت نیاز، هر ماژول می‌تواند در آینده به سرویس مستقل تبدیل شود بدون اینکه کل سیستم دچار تغییر شود.
- این نوع طراحی مانع رشد «کدهای شلوغ و همه‌چیزدان» می‌شود.

## 8. دیاگرام Package Diagram

```mermaid
classDiagram
    class SharedContracts {
      +DTOs
      +Events
      +Enums
      +Schemas
    }

    class AuthPkg {
      +AuthService
      +TokenService
      +PolicyEngine
    }

    class MediaPkg {
      +UploadService
      +TranscodingService
      +StorageService
    }

    class ContentPkg {
      +PostService
      +FeedService
      +ModerationService
    }

    class SearchPkg {
      +Indexer
      +QueryService
    }

    class RecoPkg {
      +FeatureBuilder
      +RankingService
    }

    class NotifyPkg {
      +Dispatcher
      +ChannelAdapters
    }

    SharedContracts <|-- AuthPkg
    SharedContracts <|-- MediaPkg
    SharedContracts <|-- ContentPkg
    SharedContracts <|-- SearchPkg
    SharedContracts <|-- RecoPkg
    SharedContracts <|-- NotifyPkg
```

### دلیل این انتخاب
- بستگی‌های میان بسته‌ها روشن و قابل مدیریت هستند.
- هر بسته برای خودِ دامنه‌ی مشخصی طراحی شده است.
- در آینده، هر بسته می‌تواند به یک سرویس مستقل تبدیل شود.

## 9. دیاگرام Deployment Diagram

```mermaid
flowchart TB
    subgraph Edge
      CDN[CDN / Edge Cache]
      WAF[WAF]
      LB[Load Balancer]
    end

    subgraph Runtime
      G1[API Gateway Pods]
      M1[Auth Pods]
      M2[Domain Pods]
      M3[Media Pods]
      M4[Worker Pods]
    end

    subgraph Data
      PG[(PostgreSQL Cluster)]
      RD[(Redis Cluster)]
      S3[(Object Storage)]
      ES[(Search Cluster)]
      MQ[(Message Broker)]
    end

    CDN --> WAF --> LB --> G1
    G1 --> M1
    G1 --> M2
    M2 --> M3
    M3 --> MQ
    M3 --> S3
    M2 --> PG
    M2 --> RD
    M4 --> MQ
    M4 --> ES
```

### چرا این استقرار مناسب است
- لبه و Runtime از داده جدا شده‌اند.
- مقیاس‌پذیری افقی برای هر سرویس و worker جداگانه ممکن است.
- استقرار با rollback و canary برای محیط‌های پرخطر امکان‌پذیر است.

## 10. دیاگرام Event Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Gateway
    participant Domain
    participant EventBus
    participant Search
    participant Recommendation
    participant Notification

    Client->>Gateway: ایجاد محتوا / آپلود / پرداخت
    Gateway->>Domain: ثبت رویداد اصلی
    Domain->>EventBus: publish domain event
    EventBus->>Search: index/update
    EventBus->>Recommendation: update ranking signals
    EventBus->>Notification: notify users
```

### دلیل استفاده از رویداد
- در زمان پیکربندی، سرویس‌ها از هم مستقل می‌شوند.
- اگر یکی از downstreamها در دسترس نباشد، سیستم به‌جای توقف، به‌صورت تدریجی ادامه می‌دهد.
- این مدل برای داده‌های حجیم و جریان‌های ناهمزمان ایده‌آل است.

## 11. دیاگرام Request Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Gateway
    participant Auth
    participant Module
    participant Cache
    participant DB

    Client->>Gateway: درخواست HTTP
    Gateway->>Auth: احراز هویت / مجوز
    Auth-->>Gateway: اجازه / رد
    Gateway->>Module: routing
    Module->>Cache: خواندن کش
    Module->>DB: خواندن/نوشتن تراکنشی
    DB-->>Module: نتیجه
    Module-->>Gateway: پاسخ
    Gateway-->>Client: پاسخ نهایی
```

### تصمیم ارائه‌شده
- جریان درخواست از لبه شروع می‌شود و در لایه‌ی ماژول به پایان می‌رسد.
- این مدل برای debugging و trace‌پذیری بهتر است.
- هر مرحله از request در سطح مناسب قابل مشاهده و کنترل است.

## 12. Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Gateway
    participant AuthService
    participant TokenStore
    participant Resource

    User->>Client: ورود
    Client->>Gateway: Login Request
    Gateway->>AuthService: validate credentials
    AuthService->>TokenStore: issue access/refresh token
    TokenStore-->>AuthService: token pair
    AuthService-->>Gateway: tokens
    Gateway-->>Client: return token
    Client->>Gateway: request with access token
    Gateway->>AuthService: validate token
    AuthService-->>Gateway: allow/deny
    Gateway->>Resource: forward request
```

### دلیل طراحی
- احراز هویت به‌صورت جداگانه و قابل جایگزینی پیاده‌سازی می‌شود.
- access token و refresh token با چرخه عمر واضح نگه داشته می‌شوند.
- این مدل برای ورود با چند دستگاه و سیاست‌های امنیتی آینده مناسب است.

## 13. Upload Flow

```mermaid
flowchart LR
    Client[Client] --> Gateway[Gateway]
    Gateway --> Media[Media Service]
    Media --> Signed[Signed Upload URL]
    Signed --> Storage[Object Storage]
    Storage --> Queue[Processing Queue]
    Queue --> Transcoder[Transcoding Workers]
    Transcoder --> Thumbnail[Thumbnail / Variants]
    Thumbnail --> CDN[CDN]
    Transcoder --> Metadata[Metadata Update]
```

### تصمیم طراحی
- بارگذاری مستقیم به فضای ذخیره‌سازی با URL امضا شده انجام می‌شود تا بار روی API Gateway کاهش یابد.
- پردازش رسانه غیرهمزمان انجام می‌شود تا تجربه کاربر سریع‌تر شود.
- این مدل برای میلیون‌ها فایل و حجم بالای داده مناسب است.

## 14. Streaming Flow

```mermaid
sequenceDiagram
    participant User
    participant CDN
    participant Origin
    participant StreamManifest
    participant Player

    User->>CDN: درخواست استریم
    CDN->>Origin: fetch manifest / chunks
    Origin->>StreamManifest: ارائه manifest
    StreamManifest-->>Player: HLS / DASH segments
    Player->>CDN: دریافت بخشی از جریان
```

### چرا این طراحی مناسب است
- CDN از حمله‌ی بار روی origin جلوگیری می‌کند.
- استریم با فرمت‌های استاندارد و نسخه‌های چندگانه انجام می‌شود.
- برای مصرف جهانی و پایدار بودن، این مدل بسیار مناسب است.

## 15. Search Flow

```mermaid
flowchart LR
    Content[Content Events] --> EventBus[Event Bus]
    EventBus --> Indexer[Search Indexer]
    Indexer --> SearchEngine[(Search Cluster)]
    Client[Client] --> Gateway[Gateway]
    Gateway --> SearchService[Search Service]
    SearchService --> SearchEngine
```

### دلیل طراحی
- جستجو از مسیر نوشتن جدا شده است.
- ایندکس‌گذاری رویدادمحور و غیرهمزمان است.
- این روش برای حجم بالای محتوا و جستجوهای مکرر مناسب است.

## 16. Recommendation Flow

```mermaid
flowchart LR
    Events[User/Content Events] --> Bus[Event Bus]
    Bus --> FeatureBuilder[Feature Builder]
    FeatureBuilder --> Store[(Feature Store)]
    Store --> Ranker[Ranking Service]
    Ranker --> Cache[(Redis Cache)]
    Client --> Gateway --> RecoAPI[Recommendation API]
    RecoAPI --> Cache
```

### دلیل طراحی
- الگوریتم‌های توصیه از منطق اصلی جدا شده‌اند.
- داده‌های ویژگی در یک لایه‌ی مجزا نگه‌داری می‌شود.
- این مدل برای آینده‌ی AI و ML قابل توسعه است.

## 17. Notification Flow

```mermaid
flowchart LR
    Domain[Domain Events] --> Bus[Event Bus]
    Bus --> NotifySvc[Notification Service]
    NotifySvc --> Email[Email Provider]
    NotifySvc --> Push[Push Provider]
    NotifySvc --> Webhook[Webhook Provider]
    NotifySvc --> InApp[In-App Channel]
```

### تصمیم معماری
- اعلان‌ها یک زیرسیستم مستقل‌اند، نه بخشی از منطق هر سرویس.
- این موضوع باعث می‌شود رفتار اعلان‌ها بدون تغییر در حوزه‌های دیگر گسترش یابد.
- برای افزونگی و راه‌اندازی چندپلتفرمی بسیار مناسب است.

## 18. AI Pipeline

```mermaid
flowchart LR
    MediaIn[Media Ingestion] --> FeatureExtract[Feature Extraction]
    FeatureExtract --> Model[AI Model / Embedding Service]
    Model --> VectorStore[(Vector Store)]
    VectorStore --> Recommendation[Recommendation / Search]
    Model --> Moderation[Moderation / Safety]
```

### دلیل طراحی
- خط لوله AI به‌صورت جداگانه و قابل جایگزینی پیاده‌سازی می‌شود.
- مدل‌های مختلف می‌توانند بدون تغییر در هسته‌ی سیستم جایگزین شوند.
- این مدل برای آینده‌ی analytics و smart discovery مناسب است.

## 19. Media Pipeline

```mermaid
flowchart LR
    Upload[Upload] --> Validate[Validation]
    Validate --> Metadata[Metadata Capture]
    Metadata --> Queue[Processing Queue]
    Queue --> Transcode[Transcoding]
    Transcode --> Variants[Variants / Thumbnails]
    Variants --> Storage[Object Storage]
    Variants --> CDN[CDN Delivery]
```

### چرا این تقسیم‌بندی مهم است
- لایه‌ی بارگذاری از لایه‌ی پردازش جدا شده است.
- هر مرحله مستقل و مقیاس‌پذیر است.
- برای حجم بالای فایل و سطوح مختلف کیفیت، این ساختار ضروری است.

## 20. Creator Workflow

```mermaid
flowchart TD
    Onboard[Register Creator] --> Setup[Profile Setup]
    Setup --> Upload[Upload Media]
    Upload --> Review[Review / Moderation]
    Review --> Publish[Publish Content]
    Publish --> Monetize[Monetization Setup]
    Monetize --> Analyze[Analytics / Growth]
```

### دلیل این گردش‌کار
- مسیر سازنده با مرزهای مشخص و قابل گسترش طراحی شده است.
- هر مرحله به مرجع داده‌ی خود وابسته است و از دیگر مراحل مستقل است.
- این مدل برای ورود سازندگان و رشد آنها مناسب است.

## 21. User Workflow

```mermaid
flowchart TD
    SignUp[Register] --> Login[Login]
    Login --> Discover[Discover Content]
    Discover --> Interact[Like / Comment / Follow]
    Interact --> Notify[Receive Notification]
    Notify --> Continue[Continue Engagement]
```

### دلیل طراحی این گردش‌کار
- تجربه کاربر از هسته‌ی پلتفرم جدا شده و با رویدادها پشتیبانی می‌شود.
- این مسیر در آینده به‌راحتی با تجربه‌های جدید مثل live، watch later و recommendation تقویت می‌شود.

## 22. چرا این معماری بهتر از معماری لایه‌ای سنتی است

معماری لایه‌ای سنتی معمولاً به این شکل است:

- Presentation -> Application -> Domain -> Infrastructure
- همه‌ی منطق در یک جریان افقی و به‌صورت خطی حرکت می‌کند.
- در صورت رشد، تغییر در یک بخش باعث تغییر در بخش‌های زیادی می‌شود.

این معماری بهتر است چون:

1. مرزهای دامنه واضح‌تر است
   - هر ماژول مالک داده و قرارداد خود است.
   - تغییر در یک حوزه، تأثیر کمتری روی حوزه‌های دیگر دارد.

2. مقیاس‌پذیری بهتر است
   - رسانه، جستجو، اعلان، AI و کارهای هم‌زمان به‌صورت جداگانه مقیاس می‌شوند.
   - لایه‌ی وب و API Gateway از لایه‌ی پردازش جدا شده‌اند.

3. استقلال توسعه بهتر است
   - تیم‌های مختلف می‌توانند روی ماژول‌های مختلف مستقل کار کنند.
   - Merge conflicts و وابستگی‌های کد پایین‌تر می‌آیند.

4. مقاومت در برابر خرابی بالاتر است
   - خرابی یک ماژول، کل پلتفرم را از کار نمی‌اندازد.
   - رویدادها و queueها باعث می‌شوند سیستم به‌جای توقف، در حالت degradation ادامه دهد.

5. برای آینده نگهداری‌پذیرتر است
   - در آینده، هر ماژول با حداقل تغییر به یک سرویس جداگانه تبدیل می‌شود.

## 23. چرا Modular Monolith انتخاب شده است

Modular Monolith به این معناست که هنوز یک کدبیس واحد داریم، اما آن را به ماژول‌های مستقل با مرزهای روشن تقسیم کرده‌ایم.

### دلایل انتخاب

1. سادگی عملیات
   - استقرار و مانیتورینگ ساده‌تر است نسبت به هزاران سرویس.
   - هزینه‌ی نگهداری و پیچیدگی مدیریت پایین‌تر است.

2. سرعت توسعه در آغاز کار
   - تیم می‌تواند سریع‌تر به‌سرعت راه‌اندازی کند.
   - نیاز به service discovery، API gateway چندگانه و مدیریت چندین deployment در ابتدا وجود ندارد.

3. حفظ مرزهای خوب از همان ابتدا
   - ماژول‌ها به‌صورت قراردادی و با قراردادهای روشن طراحی می‌شوند.
   - همین مرزها در آینده به‌خوبی برای جداسازی به میکروسرویس‌ها استفاده می‌شوند.

4. مناسب برای تیم‌های متوسط تا بزرگ
   - اگر تیم هنوز به اندازه‌ی کافی بزرگ نیست، مدیریت میکروسرویس‌ها هزینه‌بر و پرریسک است.

5. کاهش پرهزینه‌ی زودهنگام
   - استخراج زودهنگام به میکروسرویس، معمولاً منجر به over-engineering و پیچیدگی مدیریت می‌شود.

## 24. چگونه این معماری در آینده به میکروسرویس تبدیل می‌شود

انتقال به میکروسرویس نباید از همان ابتدا انجام شود. بهتر است در چند مرحله انجام شود.

### مرحله 1: تثبیت Modular Monolith
- مرزهای ماژول‌ها روشن شده‌اند.
- هر ماژول از قراردادهای مشترک و رویدادهای نسخه‌دار استفاده می‌کند.
- پایگاه داده‌ی مشترک هنوز در سطح منطقی کنترل می‌شود.

### مرحله 2: جداسازی سرویس‌های پرریسک
- سرویس رسانه، جستجو و اعلان به‌عنوان اولین سرویس‌های قابل جداسازی انتخاب می‌شوند.
- چرا؟ چون این حوزه‌ها از نظر حجم بار، نیاز به مقیاس و استقلال بیشتر، مناسب‌ترند.

### مرحله 3: جدا شدن از دیتابیس مشترک
- هر سرویس مالکیت داده‌ی خود را پیدا می‌کند.
- از دیتابیس مشترک به چند پایگاه داده‌ی مستقل و owner-based مهاجرت انجام می‌شود.

### مرحله 4: معرفی سرویس‌دیسکاوری و کنترل‌های بیشتر
- Service Mesh، API Gateway مستقل، Circuit Breaker، Retry، Load Balancer و Observability عمیق‌تر می‌شود.

### مرحله 5: کاهش تعهدات در سطح سازمانی
- تیم‌ها به‌صورت مستقل روی سرویس‌های خود کار می‌کنند.
- استقرار، دیتابیس و پایداری هر سرویس جداگانه مدیریت می‌شود.

### نکته مهم
- این معماری برای تبدیل به میکروسرویس آماده است چون:
  - مرزهای دامنه واضح‌اند
  - قراردادهای بین ماژول‌ها از قبل در قالب contracts/events تعریف شده‌اند
  - لبه‌ی مشترک و زیرساخت‌های پلتفرم از قبل جدا شده‌اند

## 25. تصمیم‌های کلیدی نهایی

1. دروازه API فقط لبه‌ی ورود است نه محل منطق کسب‌وکار.
2. داده‌ی تراکنشی، رسانه و جستجو از هم جدا شده‌اند.
3. رویدادها برای یکپارچه‌سازی بین ماژول‌ها استفاده می‌شوند.
4. Modular Monolith برای شروع انتخاب شده است چون ساده‌تر و قابل مدیریت‌تر است.
5. هر ماژول در آینده قابل استخراج به سرویس مستقل است.
6. این معماری نسبت به لایه‌بندی سنتی از نظر مقیاس، نگهداری، تست و تکامل برتری دارد.
