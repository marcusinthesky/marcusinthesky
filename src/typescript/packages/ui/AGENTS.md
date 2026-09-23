# UI contract

- Keep components free of profile and publication data.
- Prefer semantic HTML and server-compatible React.
- Add client boundaries only for behavior that cannot be expressed by HTML/CSS.
- Use semantic tokens such as `background`, `foreground`, `muted`, and `accent`; never embed palette values in component source.
- Every exported component requires a Storybook story.
- Interactive additions require keyboard, reduced-motion, and axe coverage.
