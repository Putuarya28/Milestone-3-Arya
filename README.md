# Navbar Component Documentation

## Overview

The `Nav` component is the main navigation bar for the **RevoShop** application. It includes the following features:
- A **logo** that links to the homepage.
- **Navigation links** for different sections of the site.
- A **shopping cart icon** that displays the total number of items in the cart and opens a cart sidebar.
- A **theme toggle** button to switch between light and dark modes.
- A **hamburger menu** for mobile navigation.

---

## File Location

`c:\Users\ecans\Documents\milestones3-ver2\components\Home\Navbar\nav.tsx`

---

## Props

| Prop      | Type       | Description                          |
|-----------|------------|--------------------------------------|
| `openNav` | `() => void` | Function to open the mobile navigation menu. |

---

## State Variables

| State       | Type        | Description                                                                 |
|-------------|-------------|-----------------------------------------------------------------------------|
| `navBg`     | `boolean`   | Tracks whether the navbar background should change based on scroll position. |
| `cartOpen`  | `boolean`   | Tracks whether the cart sidebar is open.                                    |

---

## Dependencies

- **React Hooks**: `useState`, `useEffect`
- **Icons**: `FaShoppingBag` (React Icons), `HiBars3BottomRight` (React Icons)
- **Custom Components**:
  - `ThemeToggle`: Toggles between light and dark themes.
  - `CartSidebar`: Displays the shopping cart in a sliding sidebar.
- **Context**:
  - `useCart`: Provides access to the cart state and its contents.

---

## Features

### 1. **Logo**
- Displays the site name ("RevoShop") and links to the homepage (`/`).

```tsx
<Link href="/" className="text-white font-bold text-2x1 sm:text-3xl">
  RevoShop
</Link>