# TypeScript Error Cleanup & Enforcement Rollout Plan

## Overview

This document outlines our phased approach to cleaning up TypeScript errors and gradually enforcing stricter type checking in our CI/CD pipeline. Currently, we have **1,323 TypeScript errors** across the monorepo that need to be addressed systematically.

## Current State

- **TypeScript Config**: We have `"strict": true` enabled, which should catch most type issues
- **Problem**: Our CI workflow and pre-commit hooks do NOT run `pnpm typecheck`
- **Result**: TypeScript errors are not enforced, allowing new type issues to be introduced

### Current CI/Pre-commit Checks
- ✅ `pnpm lint` (ESLint)
- ✅ `pnpm test` (Tests)  
- ❌ `pnpm typecheck` (TypeScript) - **MISSING**

## Error Analysis Summary

From our error analysis in `reports/typecheck-errors-organized.md`:

| Error Code | Count | Description | tsconfig Setting | Difficulty |
|------------|-------|-------------|------------------|------------|
| **TS7006** | 80 | Parameter implicitly has any type | `noImplicitAny: true` | 🟡 Medium |
| **TS7053** | 18 | Element implicitly has any type | `noUncheckedIndexedAccess: true` | 🟡 Medium |
| **TS7034/TS7005** | 4 | Variable implicitly has any type | `noImplicitAny: true` | 🟢 Easy |
| **TS2304** | 28 | Cannot find name/type | Type imports | 🟡 Medium |
| **TS2532** | 170 | Object is possibly undefined | `strictNullChecks: true` | 🔴 Hard |
| **TS2339** | 394 | Property does not exist on type | N/A | 🔴 Hard |
| **TS18046** | 130 | Value is of type unknown | N/A | 🔴 Hard |

## Phased Rollout Strategy

### Phase 1: Low-Hanging Fruit (Weeks 1-2)
**Target**: TS7006, TS7053, TS7034, TS7005 (102 total errors)

1. **Fix TS7006 errors** (80 errors) - Add explicit parameter types
2. **Fix TS7053 errors** (18 errors) - Fix unsafe object access  
3. **Fix TS7034/TS7005 errors** (4 errors) - Add variable types
4. **Implement targeted enforcement** for these error codes only

**Benefits**: 
- Prevents new implicit `any` types
- Enforces explicit typing on parameters
- Relatively easy fixes with high impact

### Phase 2: Import/Module Issues (Week 3)
**Target**: TS2304 (28 errors)

1. **Fix missing imports/types** (28 errors)
2. **Add to enforcement pipeline**

### Phase 3: Null Safety (Weeks 4-6)  
**Target**: TS2532, TS18047, TS18049, TS18048 (210 total errors)

1. **Add null checks and optional chaining**
2. **Strengthen `strictNullChecks` enforcement**

### Phase 4: Complex Type Issues (Weeks 7+)
**Target**: TS2339, TS18046, TS2353, etc. (800+ errors)

1. **Fix property access issues**
2. **Add proper type guards for unknown values** 
3. **Fix object literal type mismatches**

## Implementation Strategy

### Step 1: Create Targeted Type Checking Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "typecheck:ts7006": "pnpm typecheck 2>&1 | grep 'TS7006' && exit 1 || exit 0",
    "typecheck:ts7053": "pnpm typecheck 2>&1 | grep 'TS7053' && exit 1 || exit 0",
    "typecheck:phase1": "pnpm typecheck 2>&1 | grep -E 'TS7006|TS7053|TS7034|TS7005' && exit 1 || exit 0"
  }
}
```

### Step 2: Gradual CI Integration

**Week 1**: Add TS7006 checking only
```yaml
# In .github/workflows/ci_1.yml
- name: TypeCheck TS7006
  run: pnpm typecheck:ts7006
```

**Week 2**: Expand to Phase 1 errors
```yaml
# In .github/workflows/ci_1.yml  
- name: TypeCheck Phase 1
  run: pnpm typecheck:phase1
```

**Week N**: Full type checking
```yaml
# In .github/workflows/ci_1.yml
- name: TypeCheck All
  run: pnpm typecheck
```

### Step 3: Pre-commit Hook Updates

Update `.husky/pre-commit` incrementally:
```bash
# Week 1: Add TS7006 only
echo "[husky]: Running script: pnpm typecheck:ts7006"
pnpm typecheck:ts7006

# Week 2: Expand to Phase 1  
echo "[husky]: Running script: pnpm typecheck:phase1"
pnpm typecheck:phase1

# Week N: Full checking
echo "[husky]: Running script: pnpm typecheck"
pnpm typecheck
```

## Success Metrics

- [ ] **Phase 1 Complete**: 0 TS7006/TS7053/TS7034/TS7005 errors
- [ ] **Phase 2 Complete**: 0 TS2304 errors  
- [ ] **Phase 3 Complete**: 0 null safety errors
- [ ] **Phase 4 Complete**: 0 TypeScript errors total
- [ ] **Enforcement Active**: TypeScript errors fail CI builds
- [ ] **Developer Experience**: Clear error messages and fixing guidance

## Tools & Commands

### Generate Error Report
```bash
# Run typecheck and organize errors
pnpm typecheck
node misc/organize-ts-errors.cjs
```

### Check Progress
```bash
# Count remaining errors by type
pnpm typecheck 2>&1 | grep "TS7006" | wc -l
pnpm typecheck 2>&1 | grep "TS7053" | wc -l
```

### Fix Common Patterns
```bash
# Find files with TS7006 errors
pnpm typecheck 2>&1 | grep "TS7006" | cut -d':' -f1 | sort | uniq
```

## Communication Plan

1. **Team Announcement**: Share this plan with development team
2. **Weekly Updates**: Report progress in team standups
3. **Documentation**: Update this plan as we learn and adapt
4. **Training**: Share TypeScript best practices as we implement

## Risk Mitigation

- **Gradual rollout** prevents overwhelming the team
- **Targeted enforcement** allows incremental progress
- **Clear documentation** helps team understand the process
- **Error analysis** provides data-driven prioritization

## Next Steps

1. ✅ Create this rollout plan document
2. ⏳ Create targeted typecheck scripts for Phase 1 errors
3. ⏳ Begin fixing TS7006 errors (80 errors)
4. ⏳ Implement TS7006 enforcement in CI/pre-commit
5. ⏳ Move to next phase based on progress

---

*Last Updated: December 2024*
*Next Review: After Phase 1 completion*