# UI contract

- Keep components free of profile and publication data.
- Prefer semantic HTML and server-compatible React.
- Add client boundaries only for behavior that cannot be expressed by HTML/CSS.
- Use semantic tokens such as `background`, `foreground`, `muted`, and `accent`; never embed palette values in component source.
- Every exported component requires a Storybook story.
- Interactive additions require keyboard, reduced-motion, and axe coverage.
- Heritage parts in `src/heritage` carry geometry only; colour comes from `motif-*` tone roles set by the `.motif` root.
- Declare motion with `data-verb` on parts; the root's `motion` prop triggers it.
- The finished state is the default under reduced motion.
