// Replace your existing data/snippets.js with this file.
// All entries evaluate to plain JavaScript objects with the requested shape.

import { BsTypescript } from "react-icons/bs"

export const LANGUAGE_META = {
  React: {
    label: 'React',
    fileLabel: 'React.jsx',
    prismLanguage: 'jsx',
  },
  Next: {
    label: 'Next.js',
    fileLabel: 'Next.js.jsx',
    prismLanguage: 'jsx',
  },
  Typescript: {
    label: 'Typescript',
    fileLabel: 'Typescript.tsx',
    prismLanguage: 'tsx',
  },
}

export const CATEGORIES = [
  'Hooks',
  'React Router',
  'Components',
  'State Management',
  'Forms',
  'Events',
  'Effects',
  'Rendering Patterns',
  'Refs',
  'Custom Hooks',
  'Performance',
  'Async Patterns',
  'Utilities',
  'Common Patterns',
]

const createSnippet = (id, title, category, shortDescription, code) => ({
  id,
  title,
  category,
  shortDescription,
  language: 'React',
  code,
  isFavorite: false,
})

export const snippets = [
  createSnippet(
    'hook-use-state-counter',
    'useState Counter',
    'Hooks',
    'A complete counter with functional state updates.',
    `import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount((value) => value - 1)}>
        Decrease
      </button>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increase
      </button>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-effect-title',
    'useEffect Document Title',
    'Hooks',
    'Synchronizes the browser tab title with component state.',
    `import { useEffect, useState } from 'react'

export function DocumentTitle() {
  const [title, setTitle] = useState('Snippet Vault')

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <input
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      aria-label="Document title"
    />
  )
}`,
  ),
  createSnippet(
    'hook-use-memo-filter',
    'useMemo Filtered List',
    'Hooks',
    'Memoizes a filtered list so unrelated renders do not repeat the work.',
    `import { useMemo, useState } from 'react'

const products = ['Keyboard', 'Monitor', 'Mouse', 'Webcam']

export function ProductFilter() {
  const [query, setQuery] = useState('')

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) =>
      product.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
      />
      <ul>
        {visibleProducts.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-callback',
    'useCallback Stable Handler',
    'Hooks',
    'Keeps a child callback stable when its dependencies are unchanged.',
    `import { memo, useCallback, useState } from 'react'

const SaveButton = memo(function SaveButton({ onSave }) {
  return <button type="button" onClick={onSave}>Save</button>
})

export function ProfileEditor() {
  const [name, setName] = useState('')

  const handleSave = useCallback(() => {
    window.alert('Saved: ' + name)
  }, [name])

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <SaveButton onSave={handleSave} />
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-ref-render-count',
    'useRef Render Counter',
    'Hooks',
    'Stores a mutable value without triggering a new render.',
    `import { useEffect, useRef, useState } from 'react'

export function RenderCounter() {
  const [name, setName] = useState('')
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
  })

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <p>Rendered {renderCount.current} times.</p>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-context-theme',
    'useContext Theme Provider',
    'Hooks',
    'Creates a reusable context provider and a safe consumer hook.',
    `import { createContext, useContext, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}`,
  ),
  createSnippet(
    'hook-use-reducer-todo',
    'useReducer Todo List',
    'Hooks',
    'Uses explicit actions to manage a small list state machine.',
    `import { useReducer, useState } from 'react'

function todoReducer(state, action) {
  switch (action.type) {
    case 'added':
      return [...state, { id: crypto.randomUUID(), text: action.text }]
    case 'removed':
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state
  }
}

export function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [text, setText] = useState('')

  const addTodo = (event) => {
    event.preventDefault()
    if (!text.trim()) return
    dispatch({ type: 'added', text: text.trim() })
    setText('')
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={text} onChange={(event) => setText(event.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button type="button" onClick={() => dispatch({ type: 'removed', id: todo.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-layout-effect',
    'useLayoutEffect Measurement',
    'Hooks',
    'Measures an element before the browser paints to prevent visual flicker.',
    `import { useLayoutEffect, useRef, useState } from 'react'

export function MeasuredPanel() {
  const panelRef = useRef(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    if (panelRef.current) {
      setWidth(Math.round(panelRef.current.getBoundingClientRect().width))
    }
  }, [])

  return (
    <div>
      <div ref={panelRef}>Resize-aware panel</div>
      <p>Panel width: {width}px</p>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-id',
    'useId Accessible Field',
    'Hooks',
    'Connects a label, input, and help text with collision-safe IDs.',
    `import { useId } from 'react'

export function EmailField() {
  const inputId = useId()
  const helpId = useId()

  return (
    <div>
      <label htmlFor={inputId}>Email address</label>
      <input id={inputId} type="email" aria-describedby={helpId} />
      <small id={helpId}>We only use this to contact you.</small>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-transition',
    'useTransition Search',
    'Hooks',
    'Marks a large list update as non-urgent to keep typing responsive.',
    `import { useState, useTransition } from 'react'

const cities = ['Amsterdam', 'Berlin', 'Cairo', 'Lisbon', 'Tokyo']

export function CitySearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(cities)
  const [isPending, startTransition] = useTransition()

  const handleChange = (event) => {
    const nextQuery = event.target.value
    setQuery(nextQuery)

    startTransition(() => {
      setResults(
        cities.filter((city) =>
          city.toLowerCase().includes(nextQuery.toLowerCase()),
        ),
      )
    })
  }

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search cities" />
      {isPending && <p>Updating results…</p>}
      <ul>{results.map((city) => <li key={city}>{city}</li>)}</ul>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-deferred-value',
    'useDeferredValue Search',
    'Hooks',
    'Defers a slow list render while the input value updates immediately.',
    `import { useDeferredValue, useMemo, useState } from 'react'

const items = Array.from({ length: 1000 }, (_, index) => 'Item ' + (index + 1))

export function DeferredSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(deferredQuery.toLowerCase())),
    [deferredQuery],
  )

  return (
    <div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <p>{results.length} results</p>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-imperative-handle',
    'useImperativeHandle Focus API',
    'Hooks',
    'Exposes a focused imperative API instead of the child DOM node.',
    `import { forwardRef, useImperativeHandle, useRef } from 'react'

const SearchInput = forwardRef(function SearchInput(_, ref) {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }))

  return <input ref={inputRef} placeholder="Search" />
})

export function SearchControls() {
  const searchRef = useRef(null)

  return (
    <div>
      <SearchInput ref={searchRef} />
      <button type="button" onClick={() => searchRef.current?.focus()}>
        Focus search
      </button>
    </div>
  )
}`,
  ),
  createSnippet(
    'hook-use-debug-value',
    'useDebugValue Online Status',
    'Hooks',
    'Labels custom-hook state inside React DevTools.',
    `import { useDebugValue, useEffect, useState } from 'react'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useDebugValue(isOnline ? 'Online' : 'Offline')

  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return isOnline
}

export function ConnectionStatus() {
  const isOnline = useOnlineStatus()
  return <p>{isOnline ? 'Online' : 'Offline'}</p>
}`,
  ),

  createSnippet(
    'router-browser-routes',
    'BrowserRouter, Routes, and Route',
    'React Router',
    'Defines a minimal React Router application with two routes.',
    `import { BrowserRouter, Route, Routes } from 'react-router-dom'

function Home() {
  return <h1>Home</h1>
}

function About() {
  return <h1>About</h1>
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}`,
  ),
  createSnippet(
    'router-outlet-layout',
    'Nested Routes with Outlet',
    'React Router',
    'Shares a layout around nested child routes.',
    `import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div>
      <header>Dashboard</header>
      <main><Outlet /></main>
    </div>
  )
}

function Overview() {
  return <h1>Overview</h1>
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}`,
  ),
  createSnippet(
    'router-links',
    'Link and NavLink Navigation',
    'React Router',
    'Builds navigation links, including an active NavLink state.',
    `import { Link, NavLink } from 'react-router-dom'

export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <Link to="/">Home</Link>
      <NavLink
        to="/settings"
        className={({ isActive }) => isActive ? 'active-link' : 'nav-link'}
      >
        Settings
      </NavLink>
    </nav>
  )
}`,
  ),
  createSnippet(
    'router-navigate-location',
    'useNavigate and useLocation',
    'React Router',
    'Navigates forward or backward and reads the active URL.',
    `import { useLocation, useNavigate } from 'react-router-dom'

export function AccountActions() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <button type="button" onClick={() => navigate('/')}>Go home</button>
      <button type="button" onClick={() => navigate(-1)}>Go back</button>
    </div>
  )
}`,
  ),
  createSnippet(
    'router-params-search-redirect',
    'Params, Search Params, and Navigate',
    'React Router',
    'Reads route and query parameters, then redirects unauthenticated users.',
    `import { Navigate, useParams, useSearchParams } from 'react-router-dom'

export function ProductPage({ isAuthenticated }) {
  const { productId } = useParams()
  const [searchParams] = useSearchParams()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <p>
      Product: {productId}; tab: {searchParams.get('tab') || 'details'}
    </p>
  )
}`,
  ),

  createSnippet(
    'component-function-props',
    'Function Component with Props',
    'Components',
    'Uses a function component and default parameter values for optional props.',
    `export function Greeting({ name = 'Guest', tone = 'friendly' }) {
  const message = tone === 'formal' ? 'Welcome' : 'Hello'

  return <h1>{message}, {name}!</h1>
}`,
  ),
  createSnippet(
    'component-children',
    'Component with Children',
    'Components',
    'Creates a reusable wrapper that renders any nested content.',
    `export function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

export function Page() {
  return (
    <Section title="Profile">
      <p>Profile content goes here.</p>
    </Section>
  )
}`,
  ),
  createSnippet(
    'component-list-keys',
    'List, Keys, Fragments, and Dynamic Classes',
    'Components',
    'Renders stable keyed list items with a conditional class name.',
    `const tasks = [
  { id: '1', title: 'Write docs', done: true },
  { id: '2', title: 'Ship feature', done: false },
]

export function TaskList() {
  return (
    <>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.done ? 'task task--done' : 'task'}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </>
  )
}`,
  ),
  createSnippet(
    'component-conditional',
    'Conditional Rendering',
    'Components',
    'Selects an appropriate UI state with clear early returns.',
    `export function UserGreeting({ user }) {
  if (!user) {
    return <p>Please sign in.</p>
  }

  return <p>Welcome back, {user.name}.</p>
}`,
  ),
  createSnippet(
    'component-async-states',
    'Loading, Error, and Empty State',
    'Components',
    'Centralizes the standard states for an asynchronously loaded list.',
    `export function UserList({ users, isLoading, error }) {
  if (isLoading) return <p role="status">Loading users…</p>
  if (error) return <p role="alert">Could not load users.</p>
  if (!users.length) return <p>No users found.</p>

  return (
    <ul>
      {users.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}`,
  ),

  createSnippet(
    'state-local',
    'Local Component State',
    'State Management',
    'Keeps UI state close to the component that owns it.',
    `import { useState } from 'react'

export function PasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <input type={isVisible ? 'text' : 'password'} />
      <button type="button" onClick={() => setIsVisible((value) => !value)}>
        {isVisible ? 'Hide' : 'Show'} password
      </button>
    </div>
  )
}`,
  ),
  createSnippet(
    'state-lifting',
    'Lifting State Up',
    'State Management',
    'Shares one source of truth between sibling components.',
    `import { useState } from 'react'

function TemperatureInput({ label, value, onChange }) {
  return (
    <label>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState('')
  const fahrenheit = celsius === '' ? '' : (Number(celsius) * 9) / 5 + 32

  return (
    <div>
      <TemperatureInput label="Celsius " value={celsius} onChange={setCelsius} />
      <p>Fahrenheit: {fahrenheit}</p>
    </div>
  )
}`,
  ),
  createSnippet(
    'state-custom-context',
    'Context Provider and Consumer',
    'State Management',
    'Defines a custom context with a provider and safe consumer hook.',
    `import { createContext, useContext, useState } from 'react'

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en')

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}

export function LocalePicker() {
  const { locale, setLocale } = useLocale()

  return (
    <select value={locale} onChange={(event) => setLocale(event.target.value)}>
      <option value="en">English</option>
      <option value="fa">Persian</option>
    </select>
  )
}`,
  ),

  createSnippet(
    'form-controlled-validation',
    'Controlled Form with Validation',
    'Forms',
    'Handles multiple controlled fields, submit, and inline validation.',
    `import { useState } from 'react'

export function ContactForm({ onSubmit }) {
  const [values, setValues] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})

  const update = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Name is required.'
    if (!values.email.includes('@')) nextErrors.email = 'Enter a valid email.'
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) onSubmit(values)
  }

  return (
    <form onSubmit={submit} noValidate>
      <input name="name" value={values.name} onChange={update} placeholder="Name" />
      {errors.name && <p role="alert">{errors.name}</p>}
      <input name="email" value={values.email} onChange={update} placeholder="Email" />
      {errors.email && <p role="alert">{errors.email}</p>}
      <button type="submit">Send</button>
    </form>
  )
}`,
  ),
  createSnippet(
    'form-uncontrolled',
    'Uncontrolled Input Form',
    'Forms',
    'Reads a simple field from a DOM ref on submit.',
    `import { useRef } from 'react'

export function NewsletterForm({ onSubscribe }) {
  const emailRef = useRef(null)

  const submit = (event) => {
    event.preventDefault()
    const email = emailRef.current?.value.trim()
    if (email) onSubscribe(email)
  }

  return (
    <form onSubmit={submit}>
      <input ref={emailRef} type="email" required placeholder="you@example.com" />
      <button type="submit">Subscribe</button>
    </form>
  )
}`,
  ),
  createSnippet(
    'form-choice-controls',
    'Checkbox, Radio, Select, and Textarea',
    'Forms',
    'Controls the standard choice inputs in one form.',
    `import { useState } from 'react'

export function PreferencesForm() {
  const [form, setForm] = useState({
    newsletter: false,
    plan: 'starter',
    country: 'IR',
    note: '',
  })

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        <input type="checkbox" checked={form.newsletter}
          onChange={(event) => update('newsletter', event.target.checked)} />
        Receive newsletter
      </label>
      <label>
        <input type="radio" name="plan" checked={form.plan === 'starter'}
          onChange={() => update('plan', 'starter')} />
        Starter
      </label>
      <label>
        <input type="radio" name="plan" checked={form.plan === 'pro'}
          onChange={() => update('plan', 'pro')} />
        Pro
      </label>
      <select value={form.country} onChange={(event) => update('country', event.target.value)}>
        <option value="IR">Iran</option>
        <option value="DE">Germany</option>
      </select>
      <textarea value={form.note} onChange={(event) => update('note', event.target.value)} />
    </form>
  )
}`,
  ),

  createSnippet(
    'event-click',
    'onClick Event',
    'Events',
    'Handles a button click with a functional update.',
    `import { useState } from 'react'

export function ClickCounter() {
  const [clicks, setClicks] = useState(0)
  return (
    <button type="button" onClick={() => setClicks((count) => count + 1)}>
      Clicked {clicks} times
    </button>
  )
}`,
  ),
  createSnippet(
    'event-input-focus',
    'onChange, onFocus, and onBlur',
    'Events',
    'Tracks a field value and focus state.',
    `import { useState } from 'react'

export function NameField() {
  const [name, setName] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)}
        onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      <p>{isFocused ? 'Editing' : 'Not focused'}: {name}</p>
    </div>
  )
}`,
  ),
  createSnippet(
    'event-keyboard',
    'onKeyDown and onKeyUp',
    'Events',
    'Submits a search when Enter is pressed and tracks the active key.',
    `import { useState } from 'react'

export function KeyboardSearch({ onSearch }) {
  const [query, setQuery] = useState('')
  const [key, setKey] = useState('')

  return (
    <div>
      <input value={query} onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          setKey(event.key)
          if (event.key === 'Enter' && query.trim()) onSearch(query.trim())
        }}
        onKeyUp={() => setKey('')} />
      <p>{key ? 'Pressed: ' + key : 'Ready'}</p>
    </div>
  )
}`,
  ),
  createSnippet(
    'event-mouse',
    'Mouse Events',
    'Events',
    'Reads pointer coordinates while the user moves over an element.',
    `import { useState } from 'react'

export function MouseTracker() {
  const [point, setPoint] = useState({ x: 0, y: 0 })

  return (
    <div onMouseMove={(event) => setPoint({ x: event.clientX, y: event.clientY })}
      style={{ minHeight: 120, border: '1px solid currentColor' }}>
      Mouse: {point.x}, {point.y}
    </div>
  )
}`,
  ),

  createSnippet(
    'effect-fetch-abort',
    'Fetch API with Abort Cleanup',
    'Effects',
    'Loads data with loading and error states, then aborts stale requests.',
    `import { useEffect, useState } from 'react'

export function UserProfile({ userId }) {
  const [state, setState] = useState({ data: null, error: '', loading: true })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setState({ data: null, error: '', loading: true })
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users/' + userId,
          { signal: controller.signal },
        )
        if (!response.ok) throw new Error('Request failed')
        setState({ data: await response.json(), error: '', loading: false })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ data: null, error: 'Could not load user.', loading: false })
        }
      }
    }

    load()
    return () => controller.abort()
  }, [userId])

  if (state.loading) return <p>Loading…</p>
  if (state.error) return <p role="alert">{state.error}</p>
  return <p>{state.data.name}</p>
}`,
  ),
  createSnippet(
    'effect-timers',
    'Interval and Timeout Cleanup',
    'Effects',
    'Cleans up timers when the component unmounts.',
    `import { useEffect, useState } from 'react'

export function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => setSeconds((value) => value + 1), 1000)
    const timeoutId = setTimeout(() => setMessage('Timer is running.'), 3000)
    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [])

  return <p>{seconds}s {message}</p>
}`,
  ),
  createSnippet(
    'effect-window-event',
    'Window Event Listener',
    'Effects',
    'Subscribes to and cleans up a browser resize event.',
    `import { useEffect, useState } from 'react'

export function WindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return <p>Viewport width: {width}px</p>
}`,
  ),

  createSnippet(
    'render-conditionals',
    '&& and Ternary Rendering',
    'Rendering Patterns',
    'Uses a ternary for alternate content and && for optional content.',
    `export function Notification({ isSignedIn, unreadCount }) {
  return (
    <div>
      <p>{isSignedIn ? 'Welcome back' : 'Please sign in'}</p>
      {unreadCount > 0 && <p>You have {unreadCount} unread messages.</p>}
    </div>
  )
}`,
  ),
  createSnippet(
    'render-switch',
    'Switch-Based Rendering',
    'Rendering Patterns',
    'Maps a finite status value to a clear UI branch.',
    `export function RequestStatus({ status }) {
  switch (status) {
    case 'loading':
      return <p>Loading…</p>
    case 'success':
      return <p>Saved successfully.</p>
    case 'error':
      return <p role="alert">Something went wrong.</p>
    default:
      return <p>Idle</p>
  }
}`,
  ),
  createSnippet(
    'render-map-optional',
    'Mapping Arrays and Optional Chaining',
    'Rendering Patterns',
    'Safely renders an optional nested collection with stable keys.',
    `export function TeamMembers({ team }) {
  const members = team?.members ?? []
  return <ul>{members.map((member) => <li key={member.id}>{member.name}</li>)}</ul>
}`,
  ),

  createSnippet(
    'ref-focus',
    'Focus an Input',
    'Refs',
    'Focuses a DOM input imperatively from a button click.',
    `import { useRef } from 'react'

export function FocusableInput() {
  const inputRef = useRef(null)
  return (
    <div>
      <input ref={inputRef} placeholder="Type here" />
      <button type="button" onClick={() => inputRef.current?.focus()}>
        Focus input
      </button>
    </div>
  )
}`,
  ),
  createSnippet(
    'ref-scroll-dom',
    'Scroll Into View and DOM Access',
    'Refs',
    'Scrolls a referenced section into view.',
    `import { useRef } from 'react'

export function ScrollToDetails() {
  const detailsRef = useRef(null)

  return (
    <div>
      <button type="button" onClick={() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}>
        View details
      </button>
      <div style={{ height: 600 }} />
      <section ref={detailsRef} tabIndex="-1">Details</section>
    </div>
  )
}`,
  ),

  createSnippet(
    'custom-use-toggle',
    'useToggle',
    'Custom Hooks',
    'Returns reusable boolean state with toggle, enable, and disable actions.',
    `import { useCallback, useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue((current) => !current), [])
  const enable = useCallback(() => setValue(true), [])
  const disable = useCallback(() => setValue(false), [])
  return { value, toggle, enable, disable }
}`,
  ),
  createSnippet(
    'custom-use-debounce',
    'useDebounce',
    'Custom Hooks',
    'Returns a delayed version of a rapidly changing value.',
    `import { useEffect, useState } from 'react'

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}`,
  ),
  createSnippet(
    'custom-use-local-storage',
    'useLocalStorage',
    'Custom Hooks',
    'Persists state in localStorage and falls back safely on invalid data.',
    `import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}`,
  ),
  createSnippet(
    'custom-use-previous',
    'usePrevious',
    'Custom Hooks',
    'Remembers the value from the previous completed render.',
    `import { useEffect, useRef } from 'react'

export function usePrevious(value) {
  const previousRef = useRef()

  useEffect(() => {
    previousRef.current = value
  }, [value])

  return previousRef.current
}`,
  ),
  createSnippet(
    'custom-use-window-size',
    'useWindowSize',
    'Custom Hooks',
    'Tracks viewport dimensions with a cleaned-up resize subscription.',
    `import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return size
}`,
  ),
  createSnippet(
    'custom-use-click-outside',
    'useClickOutside',
    'Custom Hooks',
    'Calls a handler when a pointer event happens outside a referenced element.',
    `import { useEffect } from 'react'

export function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onOutsideClick()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [ref, onOutsideClick])
}`,
  ),

  createSnippet(
    'performance-react-memo',
    'React.memo',
    'Performance',
    'Avoids re-rendering a pure child when its props are unchanged.',
    `import { memo, useState } from 'react'

const Greeting = memo(function Greeting({ name }) {
  console.log('Greeting rendered')
  return <p>Hello, {name}</p>
})

export function MemoExample() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Greeting name="Ada" />
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Parent renders: {count}
      </button>
    </div>
  )
}`,
  ),
  createSnippet(
    'performance-memo-callback',
    'useMemo and useCallback',
    'Performance',
    'Memoizes an expensive value and a callback passed to a memoized child.',
    `import { memo, useCallback, useMemo, useState } from 'react'

const Results = memo(function Results({ items, onClear }) {
  return (
    <div>
      <p>{items.length} results</p>
      <button type="button" onClick={onClear}>Clear</button>
    </div>
  )
})

export function SearchResults({ sourceItems }) {
  const [query, setQuery] = useState('')

  const items = useMemo(
    () => sourceItems.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [sourceItems, query],
  )

  const clear = useCallback(() => setQuery(''), [])

  return (
    <div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <Results items={items} onClear={clear} />
    </div>
  )
}`,
  ),
  createSnippet(
    'performance-lazy-suspense',
    'Lazy, Suspense, and Code Splitting',
    'Performance',
    'Loads a component only when React renders it.',
    `import { lazy, Suspense, useState } from 'react'

const SettingsPanel = lazy(() => import('./SettingsPanel'))

export function SettingsPage() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div>
      <button type="button" onClick={() => setShowSettings(true)}>
        Open settings
      </button>
      {showSettings && (
        <Suspense fallback={<p>Loading settings…</p>}>
          <SettingsPanel />
        </Suspense>
      )}
    </div>
  )
}`,
  ),

  createSnippet(
    'async-promise-all',
    'async/await and Promise.all',
    'Async Patterns',
    'Loads independent resources concurrently and reports failures.',
    `import { useEffect, useState } from 'react'

export function DashboardData() {
  const [state, setState] = useState({ data: null, error: '', loading: true })

  useEffect(() => {
    async function load() {
      try {
        const [userResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users/1'),
          fetch('https://jsonplaceholder.typicode.com/posts?userId=1'),
        ])

        if (!userResponse.ok || !postsResponse.ok) throw new Error('Request failed')

        const [user, posts] = await Promise.all([
          userResponse.json(),
          postsResponse.json(),
        ])

        setState({ data: { user, posts }, error: '', loading: false })
      } catch {
        setState({ data: null, error: 'Could not load dashboard.', loading: false })
      }
    }

    load()
  }, [])

  if (state.loading) return <p>Loading…</p>
  if (state.error) return <p role="alert">{state.error}</p>
  return <p>{state.data.user.name} has {state.data.posts.length} posts.</p>
}`,
  ),
  createSnippet(
    'async-submit',
    'Async Submit with Loading State',
    'Async Patterns',
    'Prevents duplicate submissions and exposes a useful error message.',
    `import { useState } from 'react'

export function SaveProfile({ saveProfile }) {
  const [status, setStatus] = useState('idle')

  const submit = async () => {
    setStatus('loading')

    try {
      await saveProfile()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <button type="button" disabled={status === 'loading'} onClick={submit}>
        {status === 'loading' ? 'Saving…' : 'Save profile'}
      </button>
      {status === 'success' && <p>Saved.</p>}
      {status === 'error' && <p role="alert">Save failed. Try again.</p>}
    </div>
  )
}`,
  ),

  createSnippet(
    'utility-class-conditions',
    'Conditional className',
    'Utilities',
    'Builds conditional class names without an external class utility.',
    `export function StatusBadge({ status }) {
  const className = ['badge', status === 'success' ? 'badge--success' : 'badge--error']
    .filter(Boolean)
    .join(' ')

  return <span className={className}>{status}</span>
}`,
  ),
  createSnippet(
    'utility-uuid',
    'UUID Generation',
    'Utilities',
    'Creates browser-native IDs for client-side list items.',
    `import { useState } from 'react'

export function Notes() {
  const [notes, setNotes] = useState([])

  const addNote = () => {
    setNotes((current) => [
      ...current,
      { id: crypto.randomUUID(), text: 'New note' },
    ])
  }

  return (
    <div>
      <button type="button" onClick={addNote}>Add note</button>
      <ul>{notes.map((note) => <li key={note.id}>{note.text}</li>)}</ul>
    </div>
  )
}`,
  ),
  createSnippet(
    'utility-copy-clipboard',
    'Copy to Clipboard',
    'Utilities',
    'Copies text with a success state and graceful failure handling.',
    `import { useState } from 'react'

export function CopyButton({ text }) {
  const [status, setStatus] = useState('idle')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <button type="button" onClick={copy}>Copy</button>
      {status === 'copied' && <span>Copied</span>}
      {status === 'error' && <span role="alert">Copy failed</span>}
    </div>
  )
}`,
  ),

  createSnippet(
    'pattern-protected',
    'Protected Component',
    'Common Patterns',
    'Renders children only when an authenticated user is available.',
    `export function Protected({ user, children }) {
  if (!user) {
    return <p>You must sign in to view this page.</p>
  }

  return children
}

export function AccountPage({ user }) {
  return (
    <Protected user={user}>
      <h1>Account settings</h1>
    </Protected>
  )
}`,
  ),
  createSnippet(
    'pattern-layout',
    'Layout Component',
    'Common Patterns',
    'Shares application chrome while allowing each page to supply content.',
    `export function AppLayout({ navigation, children }) {
  return (
    <div>
      <header>{navigation}</header>
      <main>{children}</main>
      <footer>© 2026</footer>
    </div>
  )
}

export function HomePage() {
  return (
    <AppLayout navigation={<a href="/">Home</a>}>
      <h1>Home</h1>
    </AppLayout>
  )
}`,
  ),
  createSnippet(
    'pattern-hoc',
    'Higher-Order Component',
    'Common Patterns',
    'Adds a loading guard to any component without changing that component.',
    `export function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) return <p role="status">Loading…</p>
    return <Component {...props} />
  }
}

function Profile({ name }) {
  return <h1>{name}</h1>
}

export const ProfileWithLoading = withLoading(Profile)`,
  ),
  createSnippet(
    'pattern-compound',
    'Compound Component',
    'Common Patterns',
    'Creates a coordinated component API through a shared context.',
    `import { createContext, useContext, useState } from 'react'

const TabsContext = createContext(null)

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState('one')
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

function TabList({ children }) {
  return <div role="tablist">{children}</div>
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  return (
    <button role="tab" aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}>
      {children}
    </button>
  )
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext)
  return activeTab === id ? <div role="tabpanel">{children}</div> : null
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

export { Tabs }`,
  ),
  createSnippet(
    'pattern-render-props',
    'Render Props',
    'Common Patterns',
    'Shares mouse position logic while allowing the caller to choose the UI.',
    `import { useEffect, useState } from 'react'

export function MousePosition({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (event) => setPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return children(position)
}

export function App() {
  return (
    <MousePosition>
      {({ x, y }) => <p>Mouse: {x}, {y}</p>}
    </MousePosition>
  )
}`,
  ),
  createSnippet(
    'pattern-portal',
    'Portal Modal',
    'Common Patterns',
    'Renders a modal into a dedicated DOM node outside its parent hierarchy.',
    `import { createPortal } from 'react-dom'

export function Modal({ open, onClose, children }) {
  if (!open) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Dialog">
      <button type="button" aria-label="Close modal" onClick={onClose}>
        Close
      </button>
      {children}
    </div>,
    modalRoot,
  )
}`,
  ),
]
