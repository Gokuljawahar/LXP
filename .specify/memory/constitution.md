# LXP Constitution

## Core Principles

### Clean .NET Code
All .NET code must follow SOLID principles, use dependency injection for services, employ async/await for asynchronous operations, handle exceptions properly with try-catch or global filters, use PascalCase for classes and methods, camelCase for variables, avoid magic strings and numbers by using constants or enums, and ensure all public APIs are documented with XML comments.

### Clean React Code
All React components must be functional with hooks, use TypeScript for type safety, manage state with Redux or Context API appropriately, avoid prop drilling by using proper state management, follow component naming conventions (PascalCase), use custom hooks for reusable logic, and ensure components are small and focused on single responsibilities.

### Layered Architecture
Backend must maintain separation of concerns with API, Core (business logic), and Data layers. Frontend must use component composition and separate concerns between UI, state, and business logic.

### Testing Discipline
Unit tests are required for all business logic in backend, component tests for React components, and integration tests for API endpoints. Tests must be written before implementation (TDD) where possible.

### Code Quality and Documentation
Code must be reviewed for quality, use meaningful names, avoid code duplication, and be documented. API must have OpenAPI/Swagger documentation.

## Technology Stack

Backend: .NET 6+, Entity Framework, SQL Server. Frontend: React 18+, Redux, Bootstrap.

## Development Workflow

Use Git for version control, pull requests for code reviews, CI/CD for builds and tests.

## Governance

Constitution governs all development. Amendments require consensus. Version follows semver.
**Version**: 1.0.0 | **Ratified**: 2026-02-08 | **Last Amended**: 2026-02-08
