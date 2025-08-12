# How to Contribute

Thank you for considering contributing to Siemens IX Explorer! 🎉

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🚀 Environment Setup

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/siemens-ix-explorer.git
   cd siemens-ix-explorer
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Start** the development server:
   ```bash
   npm start
   ```

## 🎯 Contribution Guidelines

### Branch Structure

- `main`: Stable code ready for production
- `develop`: Active development
- `feature/feature-name`: New features
- `fix/bug-name`: Bug fixes

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code changes)
- `refactor`: Refactoring
- `test`: Adding/fixing tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(card): add support for video cards
fix(navigation): fix horizontal scroll on mobile
docs(readme): update installation instructions
```

### Code Standards

#### CSS/SCSS

- **BEM Methodology**: Strictly follow the Block\_\_Element--Modifier pattern
- **Descriptive names**: Use semantic and clear names
- **Nesting**: Maximum 3 levels of depth

```scss
// ✅ Correct
.card {
  &__content {
    &--featured {
      // styles
    }
  }
}

// ❌ Incorrect
.card .content.featured {
  // styles
}
```

#### TypeScript

- **Explicit typing**: Always define types
- **Interfaces**: Prefer interfaces over types when possible
- **Naming**: camelCase for variables, PascalCase for classes/interfaces

```typescript
// ✅ Correct
interface CardData {
  id: string;
  title: string;
  type: CardType;
}

// ❌ Incorrect
const carddata: any = {};
```

#### HTML

- **Semantic HTML**: Use appropriate semantic elements
- **Accessibility**: Always include ARIA attributes when necessary
- **BEM Classes**: Maintain consistency with BEM methodology

## 🧪 Testing

- Run tests: `npm test`
- Run tests in CI: `npm run test:ci`
- Maintain coverage > 80%

## 📝 Pull Requests

1. **Create a branch** from `develop`
2. **Make your changes** following the standards
3. **Add tests** if necessary
4. **Update documentation** if applicable
5. **Run tests**: `npm test`
6. **Commit** following conventions
7. **Push** to your branch
8. **Open a Pull Request** to `develop`

### PR Template

```markdown
## 📝 Description

Brief description of the changes made.

## 🔄 Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## ✅ Checklist

- [ ] Code follows project standards
- [ ] Self-reviewed the code
- [ ] Comments in complex parts
- [ ] Documentation updated
- [ ] Tests passing
- [ ] No conflicts with base branch
```

## 🎨 Design System

- **Siemens IX**: Always use design system components when available
- **Tokens**: Prefer IX CSS custom properties
- **Icons**: Use only icons from @siemens/ix-icons library
- **Colors**: Maintain compatibility with light/dark themes

## 🐛 Reporting Bugs

Use the bug issue template:

```markdown
**Description**
Clear description of the bug.

**Reproduction**
Steps to reproduce:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What should happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g. Windows 10]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

## 💡 Suggesting Improvements

To suggest improvements, open an issue with:

- **Clear title** of the suggestion
- **Detailed description** of what you'd like to see
- **Mockups or examples** if applicable
- **Justification** of why it would be useful

## 📚 Useful Resources

- [Siemens IX Documentation](https://ix.siemens.io/)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [BEM Methodology](https://getbem.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Be patient with beginners

## ❓ Questions?

- Open an issue with the `question` tag
- Contact via email
- Check documentation first

Thank you for contributing! 🚀
