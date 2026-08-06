import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '@context/LanguageContext'
import LogoImg from '@assets/images/logodark.svg'

const ICONS = {
  home: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJtMjIgMTAuNWwtOS4xMTctNy42NzhhMS4zNyAxLjM3IDAgMCAwLTEuNzY1IDBMMiAxMC41Ii8+PHBhdGggZD0iTTIwLjUgOS41VjE2YzAgMi4zNDYgMCAzLjUxOC0uNjIgNC4zMjZhMyAzIDAgMCAxLS41NTQuNTU0Yy0uODA4LjYyLTEuOTguNjItNC4zMjYuNjJWMTdjMC0xLjQxNCAwLTIuMTIxLS40NC0yLjU2QzE0LjEyMiAxNCAxMy40MTUgMTQgMTIgMTRzLTIuMTIxIDAtMi41Ni40NEM5IDE0Ljg3OCA5IDE1LjU4NSA5IDE3djQuNWMtMi4zNDYgMC0zLjUxOCAwLTQuMzI2LS42MmEzIDMgMCAwIDEtLjU1NC0uNTU0Yy0uNjItLjgwOC0uNjItMS45OC0uNjItNC4zMjZWOS41Ii8+PC9zdmc+',
  notes: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMTQgMjAuNVYyMGMwLTIuODI4IDAtNC4yNDMuODc5LTUuMTIxQzE1Ljc1NyAxNCAxNy4xNzIgMTQgMjAgMTRoLjUiLz48cGF0aCBkPSJNMTMgM2gtMkM3LjIyOSAzIDUuMzQzIDMgNC4xNzIgNC4xNzJTMyA3LjIyOSAzIDExdjJjMCAzLjc3MSAwIDUuNjU3IDEuMTcyIDYuODI4UzcuMjI5IDIxIDExIDIxaDEuMzQzYy44MTggMCAxLjIyNiAwIDEuNTk0LS4xNTJzLjY1Ny0uNDQxIDEuMjM1LTEuMDJsNC42NTYtNC42NTZjLjU3OS0uNTc4Ljg2Ny0uODY3IDEuMDItMS4yMzVjLjE1Mi0uMzY4LjE1Mi0uNzc2LjE1Mi0xLjU5NFYxMWMwLTMuNzcxIDAtNS42NTctMS4xNzItNi44MjhTMTYuNzcxIDMgMTMgMyIvPjwvc3ZnPg==',
  tasks: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMTEgNmgxMG0tMTAgNmgxMG0tMTAgNmgxMCIvPjxwYXRoICBkPSJNMyA3LjM5M1M0IDguMDQ1IDQuNSA5QzQuNSA5IDYgNS4yNSA4IDRNMyAxOC4zOTNTNCAxOS4wNDUgNC41IDIwYzAgMCAxLjUtMy43NSAzLjUtNSIvPjwvc3ZnPg==',
  projects: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICBkPSJNOCA3aDguNzVjMi4xMDcgMCAzLjE2IDAgMy45MTcuNTA2YTMgMyAwIDAgMSAuODI3LjgyN0MyMiA5LjA5IDIyIDEwLjE0MyAyMiAxMi4yNWMwIDMuNTExIDAgNS4yNjctLjg0MyA2LjUyOGE1IDUgMCAwIDEtMS4zOCAxLjM4QzE4LjUxOCAyMSAxNi43NjIgMjEgMTMuMjUgMjFIMTJjLTQuNzE0IDAtNy4wNzEgMC04LjUzNi0xLjQ2NUMyIDE4LjA3MiAyIDE1LjcxNSAyIDExVjcuOTQ0YzAtMS44MTYgMC0yLjcyNC4zOC0zLjQwNkEzIDMgMCAwIDEgMy41MzggMy4zOEM0LjIyIDMgNS4xMjggMyA2Ljk0NCAzQzguMTA4IDMgOC42OSAzIDkuMiAzLjE5MWMxLjE2My40MzYgMS42NDMgMS40OTMgMi4xNjggMi41NDJMMTIgNyIvPjwvc3ZnPg==',
  meetings: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMTYgMnY0TTggMnY0bTEzIDd2LTFjMC0zLjc3MSAwLTUuNjU3LTEuMTcyLTYuODI4UzE2Ljc3MSA0IDEzIDRoLTJDNy4yMjkgNCA1LjM0MyA0IDQuMTcyIDUuMTcyUzMgOC4yMjkgMyAxMnYyYzAgMy43NzEgMCA1LjY1NyAxLjE3MiA2LjgyOFM3LjIyOSAyMiAxMSAyMk0zIDEwaDE4Ii8+PHBhdGggZD0iTTE3LjUgMTguNWEyIDIgMCAxIDEgMC00YTIgMiAwIDAgMSAwIDRtMCAwQTMuNSAzLjUgMCAwIDEgMjEgMjJtLTMuNS0zLjVBMy41IDMuNSAwIDAgMCAxNCAyMiIvPjwvc3ZnPg==',
  calendar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCAgZD0iTTE2IDJ2NE04IDJ2NG01LTJoLTJDNy4yMjkgNCA1LjM0MyA0IDQuMTcyIDUuMTcyUzMgOC4yMjkgMyAxMnYyYzAgMy43NzEgMCA1LjY1NyAxLjE3MiA2LjgyOFM3LjIyOSAyMiAxMSAyMmgyYzMuNzcxIDAgNS42NTcgMCA2LjgyOC0xLjE3MlMyMSAxNy43NzEgMjEgMTR2LTJjMC0zLjc3MSAwLTUuNjU3LTEuMTcyLTYuODI4UzE2Ljc3MSA0IDEzIDRNMyAxMGgxOCIvPjxwYXRoICBkPSJNMTEuOTk2IDE0aC4wMDhtLS4wMDggNGguMDA4bTMuOTg3LTRIMTZtLTggMGguMDA5TTggMThoLjAwOSIvPjwvc3ZnPg==',
  templates: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMi41IDEyYzAtNC40NzggMC02LjcxOCAxLjM5MS04LjEwOVM3LjUyMSAyLjUgMTIgMi41YzQuNDc4IDAgNi43MTggMCA4LjEwOSAxLjM5MVMyMS41IDcuNTIxIDIxLjUgMTJjMCA0LjQ3OCAwIDYuNzE4LTEuMzkxIDguMTA5UzE2LjQ3OSAyMS41IDEyIDIxLjVjLTQuNDc4IDAtNi43MTggMC04LjEwOS0xLjM5MVMyLjUgMTYuNDc5IDIuNSAxMloiLz48cGF0aCAgZD0iTTExIDdoNk03IDdoMW0tMSA1aDFtLTEgNWgxbTMtNWg2bS02IDVoNiIvPjwvc3ZnPg==',
  trash: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBmaWxsPSJub25lIiAgICBkPSJtMTkuNSA1LjVsLS42MiAxMC4wMjVjLS4xNTggMi41NjEtLjIzNyAzLjg0Mi0uODggNC43NjNhNCA0IDAgMCAxLTEuMiAxLjEyOGMtLjk1Ny41ODQtMi4yNC41ODQtNC44MDYuNTg0Yy0yLjU3IDAtMy44NTUgMC00LjgxNC0uNTg1YTQgNCAwIDAgMS0xLjItMS4xM2MtLjY0Mi0uOTIyLS43Mi0yLjIwNS0uODc0LTQuNzdMNC41IDUuNU0zIDUuNWgxOG0tNC45NDQgMGwtLjY4My0xLjQwOGMtLjQ1My0uOTM2LS42OC0xLjQwMy0xLjA3MS0xLjY5NWEyIDIgMCAwIDAtLjI3NS0uMTcyQzEzLjU5NCAyIDEzLjA3NCAyIDEyLjAzNSAyYy0xLjA2NiAwLTEuNTk5IDAtMi4wNC4yMzRhMiAyIDAgMCAwLS4yNzguMThjLS4zOTUuMzAzLS42MTYuNzg4LTEuMDU4IDEuNzU3TDguMDUzIDUuNW0xLjQ0NyAxMXYtNm01IDZ2LTYiLz48L3N2Zz4=',
  collapseLtr: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMjIgMTJjMC0zLjc1IDAtNS42MjUtLjk1NS02LjkzOWE1IDUgMCAwIDAtMS4xMDYtMS4xMDZDMTguNjI1IDMgMTYuNzQ5IDMgMTMgM2gtMmMtMy43NSAwLTUuNjI1IDAtNi45MzkuOTU1QTUgNSAwIDAgMCAyLjk1NSA1LjA2QzIgNi4zNzUgMiA4LjI1MSAyIDEyczAgNS42MjUuOTU1IDYuOTM5YTUgNSAwIDAgMCAxLjEwNiAxLjEwNkM1LjM3NSAyMSA3LjI1MSAyMSAxMSAyMWgyYzMuNzUgMCA1LjYyNSAwIDYuOTM5LS45NTVhNSA1IDAgMCAwIDEuMTA2LTEuMTA2QzIyIDE3LjYyNSAyMiAxNS43NDkgMjIgMTJabS03LjUtOC41djE3Ii8+PHBhdGggIGQ9Ik0xOSA3aC0xLjVtMS41IDRoLTEuNU04IDEwbDEuMjI3IDEuMDU3Yy41MTUuNDQ1Ljc3My42NjcuNzczLjk0M3MtLjI1OC40OTgtLjc3My45NDNMOCAxNCIvPjwvc3ZnPg==',
  collapseRtl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMiAxMmMwLTMuNzUgMC01LjYyNS45NTUtNi45MzlBNSA1IDAgMCAxIDQuMDYgMy45NTVDNS4zNzUgMyA3LjI1MSAzIDExIDNoMmMzLjc1IDAgNS42MjUgMCA2LjkzOS45NTVhNSA1IDAgMCAxIDEuMTA2IDEuMTA2QzIyIDYuMzc1IDIyIDguMjUxIDIyIDEyczAgNS42MjUtLjk1NSA2LjkzOWE1IDUgMCAwIDEtMS4xMDYgMS4xMDZDMTguNjI1IDIxIDE2Ljc0OSAyMSAxMyAyMWgtMmMtMy43NSAwLTUuNjI1IDAtNi45MzktLjk1NWE1IDUgMCAwIDEtMS4xMDYtMS4xMDZDMiAxNy42MjUgMiAxNS43NDkgMiAxMlptNy41LTguNXYxNyIvPjxwYXRoICBkPSJNNSA3aDEuNU01IDExaDEuNU0xNyAxMGwtMS4yMjYgMS4wNTdjLS41MTYuNDQ1LS43NzQuNjY3LS43NzQuOTQzcy4yNTguNDk4Ljc3NC45NDNMMTcgMTQiLz48L3N2Zz4=',
  expandLtr: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMiAxMmMwLTMuNzUgMC01LjYyNS45NTUtNi45MzlBNSA1IDAgMCAxIDQuMDYgMy45NTVDNS4zNzUgMyA3LjI1MSAzIDExIDNoMmMzLjc1IDAgNS42MjUgMCA2LjkzOS45NTVhNSA1IDAgMCAxIDEuMTA2IDEuMTA2QzIyIDYuMzc1IDIyIDguMjUxIDIyIDEyczAgNS42MjUtLjk1NSA2LjkzOWE1IDUgMCAwIDEtMS4xMDYgMS4xMDZDMTguNjI1IDIxIDE2Ljc0OSAyMSAxMyAyMWgtMmMtMy43NSAwLTUuNjI1IDAtNi45MzktLjk1NWE1IDUgMCAwIDEtMS4xMDYtMS4xMDZDMiAxNy42MjUgMiAxNS43NDkgMiAxMlptNy41LTguNXYxNyIvPjxwYXRoICBkPSJNNSA3aDEuNU01IDExaDEuNU0xNyAxMGwtMS4yMjYgMS4wNTdjLS41MTYuNDQ1LS43NzQuNjY3LS43NzQuOTQzcy4yNTguNDk4Ljc3NC45NDNMMTcgMTQiLz48L3N2Zz4=',
  expandRtl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0eWxlPSJvcGFjaXR5OjE7Ij48cGF0aCBkPSJNMjIgMTJjMC0zLjc1IDAtNS42MjUtLjk1NS02LjkzOWE1IDUgMCAwIDAtMS4xMDYtMS4xMDZDMTguNjI1IDMgMTYuNzQ5IDMgMTMgM2gtMmMtMy43NSAwLTUuNjI1IDAtNi45MzkuOTU1QTUgNSAwIDAgMCAyLjk1NSA1LjA2QzIgNi4zNzUgMiA4LjI1MSAyIDEyczAgNS42MjUuOTU1IDYuOTM5YTUgNSAwIDAgMCAxLjEwNiAxLjEwNkM1LjM3NSAyMSA3LjI1MSAyMSAxMSAyMWgyYzMuNzUgMCA1LjYyNSAwIDYuOTM5LS45NTVhNSA1IDAgMCAwIDEuMTA2LTEuMTA2QzIyIDE3LjYyNSAyMiAxNS43NDkgMjIgMTJabS03LjUtOC41djE3Ii8+PHBhdGggIGQ9Ik0xOSA3aC0xLjVtMS41IDRoLTEuNU04IDEwbDEuMjI3IDEuMDU3Yy41MTUuNDQ1Ljc3My42NjcuNzczLjk0M3MtLjI1OC40OTgtLjc3My45NDNMOCAxNCIvPjwvc3ZnPg==',
}

const translations = {
  en: {
    brand: 'DevNotes',
    home: 'Home',
    workspaceGroup: 'Workspace',
    notes: 'Notes',
    tasks: 'My Tasks',
    projects: 'Projects',
    meetings: 'Meetings',
    calendar: 'Calendar',
    libraryGroup: 'Library',
    templates: 'Templates',
    systemGroup: 'System',
    trashLabel: 'Trash',
    userRole: 'Developer',
    collapse: 'Collapse sidebar',
    expand: 'Expand sidebar',
  },
  fa: {
    brand: 'دِوناتس',
    home: 'خانه',
    workspaceGroup: 'فضای کاری',
    notes: 'یادداشت‌ها',
    tasks: 'وظایف من',
    projects: 'پروژه‌ها',
    meetings: 'جلسات',
    calendar: 'تقویم',
    libraryGroup: 'کتابخانه',
    templates: 'قالب‌ها',
    systemGroup: 'سیستم',
    trashLabel: 'سطل زباله',
    userRole: 'توسعه‌دهنده',
    collapse: 'جمع کردن نوار کناری',
    expand: 'باز کردن نوار کناری',
  },
}

const GroupLabel = ({ children, collapsed }) => {
  if (collapsed) return null
  return (
    <p className="px-2.5 pt-7 pb-1 text-sm md:text-[15px] font-medium tracking-tighter text-neutral-100">
      {children}
    </p>
  )
}

const SidebarItem = ({ to, icon, label, end = false, collapsed }) => (
  <NavLink
    to={to}
    end={end}
    title={collapsed ? label : undefined}
    className={({ isActive }) =>
      [
        'group flex items-center rounded-lg px-3 py-2.5 transition-colors',
        collapsed ? 'gap-1.5 justify-center flex-col text-[11px] font-medium pb-2 pt-3' : 'gap-2 text-sm md:text-[15.5px] ',
        isActive
          ? 'bg-neutral-800 text-neutral-100'
          : 'text-white hover:bg-neutral-800/60',
      ].join(' ')
    }
  >
    <img src={icon} alt="" className="h-[21px] w-[21px] shrink-0 object-contain" />
    <span className="truncate">{label}</span>
  </NavLink>
)

// -----------------------------------------------------------------------
// Sidebar
// -----------------------------------------------------------------------

const DevNotesSidebar = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const dir = language === 'fa' ? 'rtl' : 'ltr'
  const [collapsed, setCollapsed] = useState(false)

  const toggleIcon = collapsed
    ? (dir === 'rtl' ? ICONS.expandLtr : ICONS.expandRtl)
    : (dir === 'rtl' ? ICONS.collapseLtr : ICONS.collapseRtl)

  return (
    <aside
      dir={dir}
      className={[
        'fixed flex h-screen flex-col justify-between border-neutral-900 text-primary',
        dir === 'rtl' ? 'border-l' : 'border-r',
        collapsed ? 'w-21' : 'w-70',
        'transition-[width] duration-200',
      ].join(' ')}
    >
      {/* Top: brand + nav */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pt-4">
        {/* Brand */}
        <div className={`mb-6 flex items-center gap-3 px-2 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <div>
            <img width={23} src={LogoImg} alt='logo' />
          </div>

          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? t.expand : t.collapse}
            className="ml-auto shrink-0 rounded-md p-1.5 text-neutral-400 hover:bg-neutral-700 hover:text-white"
          >
            <img src={toggleIcon} alt="" className="h-6 w-6 object-contain" />
          </button>
        </div>

        {/* Ungrouped: Home */}
        <nav className="flex flex-col gap-0.5">
          <SidebarItem
            to="/dev-notes"
            end
            icon={ICONS.home}
            label={t.home}
            collapsed={collapsed}
          />
        </nav>

        {/* Workspace group */}
        <GroupLabel collapsed={collapsed}>{t.workspaceGroup}</GroupLabel>
        <nav className="flex flex-col gap-1">
          <SidebarItem to="/dev-notes/notes" icon={ICONS.notes} label={t.notes} collapsed={collapsed} />
          <SidebarItem to="/dev-notes/tasks" icon={ICONS.tasks} label={t.tasks} collapsed={collapsed} />
          <SidebarItem to="/dev-notes/projects" icon={ICONS.projects} label={t.projects} collapsed={collapsed} />
          <SidebarItem to="/dev-notes/meetings" icon={ICONS.meetings} label={t.meetings} collapsed={collapsed} />
          <SidebarItem to="/dev-notes/calendar" icon={ICONS.calendar} label={t.calendar} collapsed={collapsed} />
        </nav>

        {/* Library group */}
        <GroupLabel collapsed={collapsed}>{t.libraryGroup}</GroupLabel>
        <nav className="flex flex-col gap-1">
          <SidebarItem to="/dev-notes/templates" icon={ICONS.templates} label={t.templates} collapsed={collapsed} />
          <SidebarItem to="/dev-notes/trash" icon={ICONS.trash} label={t.trashLabel} collapsed={collapsed} />
        </nav>

      </div>

      {/* Footer: user + collapse toggle */}
      <div className="border-t border-neutral-800 p-2">
        <div className={`flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-neutral-800/60 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-700 text-xs font-semibold text-white">
            AK
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">Amir Khorasani</p>
              <p className="truncate text-xs text-neutral-500">{t.userRole}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default DevNotesSidebar