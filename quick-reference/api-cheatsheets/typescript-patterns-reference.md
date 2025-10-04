---
title: "TypeScript Patterns & Utility Types Reference"
technology: "typescript"
version: "5.9.2"
status: "current"
confidence: "high"
last_updated: "2025-09-21"
document_type: "api_reference"
purpose: "Advanced TypeScript patterns, utility types, and modern techniques"
---

# 📝 TypeScript Patterns & Utility Types Reference

**Version**: TypeScript 5.9.2
**Focus**: Advanced patterns, utility types, and AI-native development techniques
**Last Updated**: September 21, 2025

---

## 🧩 Built-in Utility Types

### Object Manipulation Types

#### Partial<T>
**Purpose**: Make all properties optional
**Use Case**: Form updates, partial API responses

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// All properties become optional
type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; age?: number; }

// Usage in function
function updateUser(id: string, updates: Partial<User>) {
  // Only update provided fields
  return { ...existingUser, ...updates };
}

updateUser('123', { name: 'New Name' }); // ✅ Valid
updateUser('123', { age: 30, email: 'new@email.com' }); // ✅ Valid
```

#### Required<T>
**Purpose**: Make all properties required
**Use Case**: Ensuring complete data before processing

```typescript
interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; retries: number; }

function initializeApp(config: RequiredConfig) {
  // All properties guaranteed to exist
  console.log(config.apiUrl.toUpperCase()); // No optional chaining needed
}
```

#### Pick<T, K>
**Purpose**: Select specific properties from a type
**Use Case**: Creating focused interfaces, API responses

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Pick only display fields
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;
// { id: string; name: string; price: number; }

// Pick for form data
type ProductForm = Pick<Product, 'name' | 'description' | 'price' | 'category'>;

function displayProducts(products: ProductSummary[]) {
  return products.map(p => `${p.name}: $${p.price}`);
}
```

#### Omit<T, K>
**Purpose**: Exclude specific properties from a type
**Use Case**: Removing sensitive data, API transformations

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// Remove sensitive information
type PublicUser = Omit<User, 'password'>;
// { id: string; name: string; email: string; role: 'admin' | 'user'; }

// Remove auto-generated fields for creation
type CreateUser = Omit<User, 'id'>;

function getPublicUserData(user: User): PublicUser {
  const { password, ...publicData } = user;
  return publicData;
}
```

### Array and Tuple Types

#### Record<K, V>
**Purpose**: Create an object type with specific key-value types
**Use Case**: Dictionaries, lookup tables, indexed data

```typescript
// Simple record
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
const roles: UserRoles = {
  'user1': 'admin',
  'user2': 'user',
  'user3': 'guest'
};

// Complex record with union keys
type HttpStatusMessages = Record<200 | 404 | 500, string>;
const statusMessages: HttpStatusMessages = {
  200: 'OK',
  404: 'Not Found',
  500: 'Internal Server Error'
};

// Record with object values
type ComponentProps = Record<string, {
  required: boolean;
  type: string;
  default?: any;
}>;

const formProps: ComponentProps = {
  username: { required: true, type: 'string' },
  age: { required: false, type: 'number', default: 0 }
};
```

#### Exclude<T, U> & Extract<T, U>
**Purpose**: Filter union types
**Use Case**: Type refinement, conditional types

```typescript
type AllColors = 'red' | 'green' | 'blue' | 'yellow' | 'purple';

// Exclude specific colors
type PrimaryColors = Exclude<AllColors, 'yellow' | 'purple'>;
// 'red' | 'green' | 'blue'

// Extract specific colors
type WarmColors = Extract<AllColors, 'red' | 'yellow'>;
// 'red' | 'yellow'

// Practical example: Event types
type AllEvents = 'click' | 'hover' | 'focus' | 'keydown' | 'keyup';
type MouseEvents = Extract<AllEvents, 'click' | 'hover'>;
type KeyboardEvents = Extract<AllEvents, 'keydown' | 'keyup'>;
```

---

## 🎯 Advanced Type Patterns

### Conditional Types

#### Basic Conditional Types
```typescript
// Basic syntax: T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// Practical example: API response types
type ApiResponse<T> = T extends string
  ? { message: T; success: boolean }
  : { data: T; success: boolean };

type StringResponse = ApiResponse<string>;
// { message: string; success: boolean }

type DataResponse = ApiResponse<{ id: number; name: string }>;
// { data: { id: number; name: string }; success: boolean }
```

#### Infer Keyword
```typescript
// Extract return type from function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: 'John', email: 'john@example.com' };
}

type UserType = ReturnType<typeof getUser>;
// { id: number; name: string; email: string; }

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = ArrayElement<string[]>; // string
type NumberArray = ArrayElement<number[]>; // number

// Extract Promise value type
type PromiseValue<T> = T extends Promise<infer U> ? U : never;

type AsyncUserType = PromiseValue<Promise<User>>; // User
```

### Template Literal Types

#### String Manipulation
```typescript
// Capitalize, Uncapitalize, Uppercase, Lowercase
type Greeting = `hello world`;
type CapitalizedGreeting = Capitalize<Greeting>; // "Hello world"
type UpperGreeting = Uppercase<Greeting>; // "HELLO WORLD"
type LowerGreeting = Lowercase<Greeting>; // "hello world"

// Dynamic string building
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // "onClick"
type HoverEvent = EventName<'hover'>; // "onHover"

// API endpoint generation
type ApiEndpoint<T extends string> = `/api/${T}`;
type UserEndpoint = ApiEndpoint<'users'>; // "/api/users"
type PostEndpoint = ApiEndpoint<'posts'>; // "/api/posts"

// CSS property generation
type CSSProperty<T extends string> = `--${T}`;
type ThemeColor = CSSProperty<'primary-color'>; // "--primary-color"
```

#### Path and Key Extraction
```typescript
// Extract object paths
type ObjectPaths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${ObjectPaths<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  cache: {
    enabled: boolean;
    ttl: number;
  };
}

type ConfigPaths = ObjectPaths<Config>;
// "database" | "database.host" | "database.port" |
// "database.credentials" | "database.credentials.username" |
// "database.credentials.password" | "cache" | "cache.enabled" | "cache.ttl"
```

### Mapped Types

#### Custom Mapped Types
```typescript
// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

type UserUpdate = PartialBy<User, 'name' | 'age'>;
// { id: string; email: string; name?: string; age?: number; }

// Make specific properties required
type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface Config {
  apiUrl?: string;
  timeout?: number;
  debug?: boolean;
}

type ProductionConfig = RequiredBy<Config, 'apiUrl'>;
// { apiUrl: string; timeout?: number; debug?: boolean; }
```

#### Transformation Mapped Types
```typescript
// Add prefix to all keys
type Prefixed<T, P extends string> = {
  [K in keyof T as `${P}${K & string}`]: T[K];
};

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
};

type CSSVariables = Prefixed<ThemeColors, '--'>;
// { '--primary': string; '--secondary': string; '--accent': string; }

// Convert to getters
type Getters<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getEmail: () => string; getAge: () => number; }
```

---

## 🚀 AI-Native Patterns

### Type-Safe AI Function Calling
```typescript
import { z } from 'zod';

// Define tool schema with TypeScript types
const weatherToolSchema = z.object({
  location: z.string().describe('City and country'),
  units: z.enum(['celsius', 'fahrenheit']).default('celsius')
});

type WeatherTool = z.infer<typeof weatherToolSchema>;

// Type-safe tool function
async function getWeather(params: WeatherTool) {
  // Implementation here
  return {
    temperature: 22,
    condition: 'sunny',
    location: params.location,
    units: params.units
  };
}

// AI function registry
type ToolFunction<T = any> = (params: T) => Promise<any>;

interface ToolRegistry {
  getWeather: ToolFunction<WeatherTool>;
  calculateTip: ToolFunction<{ amount: number; percentage: number }>;
  sendEmail: ToolFunction<{ to: string; subject: string; body: string }>;
}

// Type-safe tool calling
async function callTool<K extends keyof ToolRegistry>(
  toolName: K,
  params: Parameters<ToolRegistry[K]>[0]
): Promise<ReturnType<ToolRegistry[K]>> {
  const tool = tools[toolName];
  return await tool(params);
}
```

### Streaming Response Types
```typescript
// AI streaming response types
interface StreamChunk<T = string> {
  type: 'text' | 'data' | 'error' | 'done';
  content: T;
  metadata?: Record<string, any>;
}

type TextStreamChunk = StreamChunk<string>;
type DataStreamChunk = StreamChunk<any>;
type ErrorStreamChunk = StreamChunk<{ message: string; code?: string }>;

// Async iterator for streaming
interface AIStreamResponse<T> {
  [Symbol.asyncIterator](): AsyncIterator<StreamChunk<T>>;
  response: Promise<{
    content: T;
    usage: { tokens: number; cost: number };
    metadata: Record<string, any>;
  }>;
}

// Type-safe streaming function
async function* streamAIResponse(
  prompt: string
): AsyncGenerator<TextStreamChunk, void, unknown> {
  // Implementation here
  yield { type: 'text', content: 'Hello' };
  yield { type: 'text', content: ' world!' };
  yield { type: 'done', content: '' };
}
```

### Generative UI Types
```typescript
import { ReactNode } from 'react';

// UI generation tool types
interface UITool<P = any> {
  name: string;
  description: string;
  parameters: any; // Zod schema
  render: (params: P) => ReactNode;
}

// Chart generation tool
const chartTool: UITool<{
  data: Array<{ label: string; value: number }>;
  type: 'bar' | 'line' | 'pie';
}> = {
  name: 'generateChart',
  description: 'Generate a data visualization chart',
  parameters: z.object({
    data: z.array(z.object({
      label: z.string(),
      value: z.number()
    })),
    type: z.enum(['bar', 'line', 'pie'])
  }),
  render: ({ data, type }) => <Chart data={data} type={type} />
};

// UI tool registry
type UIToolRegistry = {
  [K: string]: UITool<any>;
};

// Type-safe UI generation
function generateUI<K extends keyof UIToolRegistry>(
  toolName: K,
  params: Parameters<UIToolRegistry[K]['render']>[0]
): ReactNode {
  const tool = uiTools[toolName];
  return tool.render(params);
}
```

---

## 🔧 Performance & Optimization Patterns

### Lazy Type Loading
```typescript
// Lazy import types for large applications
type LazyUserModule = () => Promise<typeof import('./types/user')>;
type LazyProductModule = () => Promise<typeof import('./types/product')>;

// Dynamic type loading based on feature flags
type FeatureTypes<T extends string> = T extends 'advanced'
  ? typeof import('./types/advanced')
  : typeof import('./types/basic');

// Conditional type loading
interface TypeLoader {
  loadUserTypes(): Promise<import('./types/user').UserTypes>;
  loadProductTypes(): Promise<import('./types/product').ProductTypes>;
}
```

### Branded Types for Type Safety
```typescript
// Create branded types to prevent mixing similar primitives
declare const __brand: unique symbol;
type Brand<T, K> = T & { [__brand]: K };

type UserId = Brand<string, 'UserId'>;
type ProductId = Brand<string, 'ProductId'>;
type Email = Brand<string, 'Email'>;

// Helper functions for creating branded types
function createUserId(id: string): UserId {
  // Validation logic here
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes('@')) {
    throw new Error('Invalid email format');
  }
  return email as Email;
}

// Usage prevents accidental mixing
function getUser(id: UserId) { /* ... */ }
function getProduct(id: ProductId) { /* ... */ }

const userId = createUserId('user_123');
const productId = createProductId('prod_456');

getUser(userId); // ✅ Valid
getUser(productId); // ❌ Type error - prevents bugs
```

### High-Performance Type Unions
```typescript
// Efficient discriminated unions
interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: any;
}

interface ErrorState {
  status: 'error';
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

// Type guards for efficient narrowing
function isSuccess(state: AsyncState): state is SuccessState {
  return state.status === 'success';
}

function isError(state: AsyncState): state is ErrorState {
  return state.status === 'error';
}

// Usage with perfect type narrowing
function handleState(state: AsyncState) {
  if (isSuccess(state)) {
    // TypeScript knows state.data exists
    console.log(state.data);
  } else if (isError(state)) {
    // TypeScript knows state.error exists
    console.error(state.error);
  }
}
```

---

## 🏗️ Architecture Patterns

### Plugin System Types
```typescript
// Define plugin interface
interface Plugin<T = any> {
  name: string;
  version: string;
  init: (config: T) => Promise<void>;
  destroy: () => Promise<void>;
}

// Plugin registry with type safety
class PluginRegistry<T extends Record<string, Plugin>> {
  private plugins = new Map<keyof T, T[keyof T]>();

  register<K extends keyof T>(name: K, plugin: T[K]) {
    this.plugins.set(name, plugin);
  }

  get<K extends keyof T>(name: K): T[K] | undefined {
    return this.plugins.get(name) as T[K] | undefined;
  }
}

// Usage
interface AppPlugins {
  auth: Plugin<{ provider: 'oauth' | 'jwt' }>;
  cache: Plugin<{ ttl: number; maxSize: number }>;
  logger: Plugin<{ level: 'debug' | 'info' | 'error' }>;
}

const registry = new PluginRegistry<AppPlugins>();
```

### Event System Types
```typescript
// Type-safe event system
interface EventMap {
  'user:login': { userId: string; timestamp: Date };
  'user:logout': { userId: string };
  'product:created': { productId: string; category: string };
  'order:completed': { orderId: string; amount: number };
}

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners = new Map<keyof T, Function[]>();

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void) {
    const existing = this.listeners.get(event) || [];
    this.listeners.set(event, [...existing, listener]);
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach(listener => listener(data));
  }

  off<K extends keyof T>(event: K, listener: (data: T[K]) => void) {
    const existing = this.listeners.get(event) || [];
    this.listeners.set(event, existing.filter(l => l !== listener));
  }
}

// Usage
const eventBus = new TypedEventEmitter<EventMap>();

eventBus.on('user:login', (data) => {
  // data is correctly typed as { userId: string; timestamp: Date }
  console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

eventBus.emit('user:login', {
  userId: 'user_123',
  timestamp: new Date()
});
```

### State Management Types
```typescript
// Redux-style state management with TypeScript
interface AppState {
  user: {
    id: string | null;
    name: string;
    email: string;
  } | null;
  products: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  ui: {
    loading: boolean;
    error: string | null;
  };
}

// Action types
type Action =
  | { type: 'user/login'; payload: { id: string; name: string; email: string } }
  | { type: 'user/logout' }
  | { type: 'products/add'; payload: { id: string; name: string; price: number } }
  | { type: 'ui/setLoading'; payload: boolean }
  | { type: 'ui/setError'; payload: string | null };

// Type-safe reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'user/login':
      return {
        ...state,
        user: action.payload
      };
    case 'user/logout':
      return {
        ...state,
        user: null
      };
    case 'products/add':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'ui/setLoading':
      return {
        ...state,
        ui: { ...state.ui, loading: action.payload }
      };
    case 'ui/setError':
      return {
        ...state,
        ui: { ...state.ui, error: action.payload }
      };
    default:
      return state;
  }
}
```

---

## 🔍 Debugging & Development Types

### Type Introspection Utilities
```typescript
// Debug utility types
type Debug<T> = T & { __debug?: never };

// Pretty print complex types
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Example usage
type ComplexType = Pick<User, 'id' | 'name'> & { role: string };
type PrettyType = Prettify<ComplexType>;
// Shows: { id: string; name: string; role: string; }

// Type testing utilities
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

// Test your types
type Test1 = Expect<Equal<string, string>>; // ✅
type Test2 = Expect<Equal<string, number>>; // ❌ Type error as expected
```

### Development Mode Types
```typescript
// Environment-based type behavior
type DevMode = typeof process.env.NODE_ENV extends 'development' ? true : false;

interface ApiResponse<T> {
  data: T;
  success: boolean;
  // Debug info only in development
  ...(DevMode extends true ? { debug: { query: string; duration: number } } : {});
}

// Type-safe feature flags
interface FeatureFlags {
  newDashboard: boolean;
  advancedAnalytics: boolean;
  betaFeatures: boolean;
}

type EnabledFeatures<T extends FeatureFlags> = {
  [K in keyof T]: T[K] extends true ? K : never;
}[keyof T];

// Usage
type CurrentFeatures = EnabledFeatures<{
  newDashboard: true;
  advancedAnalytics: false;
  betaFeatures: true;
}>;
// "newDashboard" | "betaFeatures"
```

---

*Reference updated for TypeScript 5.9.2 - September 21, 2025*