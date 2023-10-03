# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [21.11.0-pre-prod.0](https://github.com/WTW-IM/es-components/compare/v21.10.0...v21.11.0-pre-prod.0) (2023-10-03)

### Update

- adding 'disabled' to the colors list ([db0d038](https://github.com/WTW-IM/es-components/commit/db0d03887ae90ffc6714bc6bd46341edfe641ed8))

# [21.9.0](https://github.com/WTW-IM/es-components/compare/v21.9.0-pre-prod.4...v21.9.0) (2023-09-08)

**Note:** Version bump only for package es-components-via-theme

# [21.9.0-pre-prod.2](https://github.com/WTW-IM/es-components/compare/v21.9.0-pre-prod.1...v21.9.0-pre-prod.2) (2023-08-24)

### Build

- ensuring all packages function downstream ([2e64bc5](https://github.com/WTW-IM/es-components/commit/2e64bc5c7375f9397c3334e71052d37c044a3161))
- ensuring themes are built before publish ([57d81d3](https://github.com/WTW-IM/es-components/commit/57d81d3ee3b53c2591286fabca459f57db32d30c))
- including all dist files for themes in packages ([3732d99](https://github.com/WTW-IM/es-components/commit/3732d994eff48a597670e35e58f1b00e865424ff))
- solidifying referenced packages in tsconfig ([4eb52fc](https://github.com/WTW-IM/es-components/commit/4eb52fc96a7f3a16d0abbc6a800a4cc489fe3b36))
- updating to npm workspaces ([416a3b6](https://github.com/WTW-IM/es-components/commit/416a3b638037f4479818eb9f2883764ad2bdb648))

### Fix

- better working with local deps ([e9447f2](https://github.com/WTW-IM/es-components/commit/e9447f24f658c4959c15ca27650531ff1b6cc2f0))
- ensuring cypress starts and runs under https ([d7c88ef](https://github.com/WTW-IM/es-components/commit/d7c88ef27cc8179018161ee3954d511b263427ee))
- ensuring tests pass with Button updates ([b140fec](https://github.com/WTW-IM/es-components/commit/b140fec720cf305b87d1b53a4e4d5cb965887155))
- ensuring TS works in all projects ([ff18d8c](https://github.com/WTW-IM/es-components/commit/ff18d8c9e871ceacd7ae6679cd77de7ba1aa209f))

### New

- adding es-components-shared-types as a local npm package ([12e7c58](https://github.com/WTW-IM/es-components/commit/12e7c58a7ea40dc9376e7f559fdb92a2c092af1c))
- adding ESTheme interface to themes with buttonStyles definitions ([53a2539](https://github.com/WTW-IM/es-components/commit/53a253933774b623e706efb8984c23ada91beed9))
- converting Banner to Typescript ([269aafe](https://github.com/WTW-IM/es-components/commit/269aafea32d18c42681a043dc0a0c2fc943db32e))
- converting Fieldset to typescript ([a57bb4b](https://github.com/WTW-IM/es-components/commit/a57bb4ba5866c184d6334444f51c830dcf5ad992))
- converting Styleguide components to Typescript ([27e8728](https://github.com/WTW-IM/es-components/commit/27e872867508561bfba5b4ca827bcad369f0f626))
- typescript support for via-theme ([0e039ec](https://github.com/WTW-IM/es-components/commit/0e039ec6da2653e2402f0dad88cbebaf6b054db6))
- updating Switch to Typescript ([14cf256](https://github.com/WTW-IM/es-components/commit/14cf256d7977d78587346fa7db708f2a16bb7848))
- updating wtw-legacy-theme to typescript ([57f6a62](https://github.com/WTW-IM/es-components/commit/57f6a625e97172df24837052dcbda5a01ab643cd))

### Update

- ensuring theme code builds ([0323f37](https://github.com/WTW-IM/es-components/commit/0323f3709b7011571f7aaa4e3c83371395123441))
- fixes after rebase ([d6ba3f5](https://github.com/WTW-IM/es-components/commit/d6ba3f53ca52dafc680941bffc83e029f5834d52))
- using Button props for LinkButton typescript ([846214b](https://github.com/WTW-IM/es-components/commit/846214b2342a26d02052e66f51e703938606c5df))

# [21.8.0](https://github.com/WTW-IM/es-components/compare/v21.8.0-pre-prod.0...v21.8.0) (2023-05-08)

**Note:** Version bump only for package es-components-via-theme

# [21.8.0-pre-prod.0](https://github.com/WTW-IM/es-components/compare/v21.7.2-pre-prod.0...v21.8.0-pre-prod.0) (2023-05-08)

### Fix

- correcting default validation state text color - fixes #751 ([7242000](https://github.com/WTW-IM/es-components/commit/72420008d287d41ef4e361b60c42dd232acb021c)), closes [#751](https://github.com/WTW-IM/es-components/issues/751)

### New

- adding typescript declarations for es-components-via-theme ([7d797f3](https://github.com/WTW-IM/es-components/commit/7d797f3947f86e57d37df3a83aae884ffc5dc6f3))

### Update

- building themes on prepublishOnly ([6b5668f](https://github.com/WTW-IM/es-components/commit/6b5668f4a43a9c3be07cc44101f33a8725511136))
- ensuring props have appropriate types ([6d17968](https://github.com/WTW-IM/es-components/commit/6d17968e621f1be5a0418290f777156ebe9bd513))
- exporting type maps with types ([b460292](https://github.com/WTW-IM/es-components/commit/b46029267bb4e16c300e630fbe0d907addeb639f))
- not modifying exported theme type declarations ([9054e1a](https://github.com/WTW-IM/es-components/commit/9054e1a41fbbde6b253d128bbd4bc082de856e08))
- optimizing type declarations in themes ([97abfd9](https://github.com/WTW-IM/es-components/commit/97abfd94d1366fe8bcd5974bcf3cdd001374d4f4))
- removing index.d.ts.map files from git ([7c4dc2d](https://github.com/WTW-IM/es-components/commit/7c4dc2dd3c2d42cc2a053790679bfdc530c74363))

## [21.7.1](https://github.com/WTW-IM/es-components/compare/v21.7.1-pre-prod.2...v21.7.1) (2023-03-16)

**Note:** Version bump only for package es-components-via-theme

## [21.7.1-pre-prod.0](https://github.com/WTW-IM/es-components/compare/v21.7.0...v21.7.1-pre-prod.0) (2023-03-10)

### Fix

- change input fields height and hover outlinebutton ([25ca7d4](https://github.com/WTW-IM/es-components/commit/25ca7d43a3e756ff1b9ec312b0f1640af913f88f))

## [21.6.97](https://github.com/WTW-IM/es-components/compare/v21.6.97-pre-prod.2...v21.6.97) (2023-02-16)

**Note:** Version bump only for package es-components-via-theme

## [21.6.97-pre-prod.1](https://github.com/WTW-IM/es-components/compare/v21.6.97-pre-prod.0...v21.6.97-pre-prod.1) (2023-02-07)

### Fix

- using styleguide global theme for initial render ([906ee7c](https://github.com/WTW-IM/es-components/commit/906ee7cba4e8c7bbaee309215429cddfe165da41))

## [21.6.96](https://github.com/WTW-IM/es-components/compare/v21.6.96-pre-prod.0...v21.6.96) (2023-01-26)

**Note:** Version bump only for package es-components-via-theme

## [21.6.96-pre-prod.0](https://github.com/WTW-IM/es-components/compare/v21.6.95...v21.6.96-pre-prod.0) (2023-01-26)

## [21.6.95-pre-prod.6](https://github.com/WTW-IM/es-components/compare/v21.6.95-pre-prod.5...v21.6.95-pre-prod.6) (2023-01-26)

### Build

- [skip ci][skip-release] v21.6.95-pre-prod.6 ([bd4f610](https://github.com/WTW-IM/es-components/commit/bd4f610d5a8b2001d72083d20b27ffafcc5a58da))
- fixing lockfile issues ([6992cf3](https://github.com/WTW-IM/es-components/commit/6992cf3d7a0a7340f33f13a03862784365271f9b))

## [21.6.95](https://github.com/WTW-IM/es-components/compare/v21.6.95-pre-prod.5...v21.6.95) (2023-01-26)

**Note:** Version bump only for package es-components-via-theme

## [21.6.95-pre-prod.5](https://github.com/WTW-IM/es-components/compare/v21.6.95-pre-prod.4...v21.6.95-pre-prod.5) (2023-01-25)

### Build

- fixing lockfile issues ([6992cf3](https://github.com/WTW-IM/es-components/commit/6992cf3d7a0a7340f33f13a03862784365271f9b))

## [21.6.95-pre-prod.5](https://github.com/WTW-IM/es-components/compare/v21.6.95-pre-prod.4...v21.6.95-pre-prod.5) (2023-01-25)

### Build

- ensuring styleguide can run completely ([6ba5ef3](https://github.com/WTW-IM/es-components/commit/6ba5ef36adfafd42cf3c0f296da8a268abf08e4c))

## [21.6.95-pre-prod.0](https://github.com/WTW-IM/es-components/compare/v21.7.0-pre-prod.10...v21.6.95-pre-prod.0) (2023-01-25)

## [21.6.94](https://github.com/WTW-IM/es-components/compare/v21.6.93...v21.6.94) (2022-11-09)

### Build

- [skip ci][skip-release] v21.6.94 ([188ceae](https://github.com/WTW-IM/es-components/commit/188ceaed1caaafd562901dc61c9f40e8de85b853))

## [21.6.94](https://github.com/WTW-IM/es-components/compare/v21.6.93...v21.6.94) (2022-11-09)

### Update

- added Blue25 to themes ([75c31f9](https://github.com/WTW-IM/es-components/commit/75c31f950c7cdea1afbc3a36097fe7e9a41c3129))

## [21.6.93](https://github.com/WTW-IM/es-components/compare/v21.6.93-pre-prod.5...v21.6.93) (2022-10-19)

**Note:** Version bump only for package es-components-via-theme

## 21.6.93-pre-prod.2 (2022-10-12)

**Note:** Version bump only for package es-components-via-theme

## 21.6.93-pre-prod.1 (2022-10-12)

**Note:** Version bump only for package es-components-via-theme

## 21.6.93-pre-prod.0 (2022-10-11)

**Note:** Version bump only for package es-components-via-theme

## [21.6.92](https://github.com/WTW-IM/es-components/compare/v21.6.92-pre-prod.0...v21.6.92) (2022-09-21)

**Note:** Version bump only for package es-components-via-theme

## 21.6.92-pre-prod.0 (2022-09-16)

### Build

- update changelog generator ([b8c29f5](https://github.com/WTW-IM/es-components/commit/b8c29f50045c13c8fc13e66eca8a0eb972ea712a))

## <small>21.6.91 (2022-09-06)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.91-pre-prod.0 (2022-08-31)</small>

- Merge pull request #642 from WTW-IM/react-18 ([c076594](https://github.com/WTW-IM/es-components/commit/c076594)), closes [#642](https://github.com/WTW-IM/es-components/issues/642)

## <small>21.6.90 (2022-07-21)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.90-pre-prod.0 (2022-07-21)</small>

- Merge pull request #635 from WTW-IM/fix-full-color-icons-page ([ee3d98e](https://github.com/WTW-IM/es-components/commit/ee3d98e)), closes [#635](https://github.com/WTW-IM/es-components/issues/635)

## <small>21.6.89 (2022-07-19)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.89-pre-prod.0 (2022-07-18)</small>

- Merge pull request #628 from WTW-IM/WE-17039-add-role-to-notification ([fcddbff](https://github.com/WTW-IM/es-components/commit/fcddbff)), closes [#628](https://github.com/WTW-IM/es-components/issues/628)

## <small>21.6.88 (2022-07-11)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.88-pre-prod.1 (2022-07-07)</small>

- Merge pull request #631 from WTW-IM/prevent-fieldset-rerender ([babb501](https://github.com/WTW-IM/es-components/commit/babb501)), closes [#631](https://github.com/WTW-IM/es-components/issues/631)

## <small>21.6.88-pre-prod.0 (2022-07-05)</small>

- Merge pull request #629 from WTW-IM/export-useuniqueid ([7d90a4f](https://github.com/WTW-IM/es-components/commit/7d90a4f)), closes [#629](https://github.com/WTW-IM/es-components/issues/629)

## <small>21.6.87 (2022-06-24)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.87-pre-prod.0 (2022-06-17)</small>

- Merge pull request #624 from WTW-IM/switch-checked-bugfix ([d023b00](https://github.com/WTW-IM/es-components/commit/d023b00)), closes [#624](https://github.com/WTW-IM/es-components/issues/624)

## <small>21.6.86 (2022-05-19)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.86-pre-prod.0 (2022-05-17)</small>

- Merge pull request #618 from WTW-IM/WE-16644-design-consistency ([7c38006](https://github.com/WTW-IM/es-components/commit/7c38006)), closes [#618](https://github.com/WTW-IM/es-components/issues/618)

## <small>21.6.85 (2022-05-12)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.85-pre-prod.0 (2022-05-12)</small>

- Merge pull request #620 from WTW-IM/drawers-effect-fix ([2440656](https://github.com/WTW-IM/es-components/commit/2440656)), closes [#620](https://github.com/WTW-IM/es-components/issues/620)

## <small>21.6.84 (2022-05-12)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.83-pre-prod.1 (2022-05-11)</small>

- Merge pull request #616 from WTW-IM/add-drawer-item-onchange ([0b20dfe](https://github.com/WTW-IM/es-components/commit/0b20dfe)), closes [#616](https://github.com/WTW-IM/es-components/issues/616)

## <small>21.6.83-pre-prod.0 (2022-05-10)</small> & <small>21.6.83 (2022-05-10)</small>

- Merge remote-tracking branch 'origin/main' into pre-prod [skip-release](<[56b8bc0](https://github.com/WTW-IM/es-components/commit/56b8bc0)>)

## <small>21.6.82 (2022-01-31)</small>

- [skip ci] v21.6.82 ([7e93406](https://github.com/WTW-IM/es-components/commit/7e93406))

## <small>21.6.82-pre-prod.1 (2022-01-31)</small> & <small>21.6.82 (2022-01-31)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.82-pre-prod.5 (2022-05-10)</small>

- Merge pull request #614 from WTW-IM/drawers-fix ([8b99aa7](https://github.com/WTW-IM/es-components/commit/8b99aa7)), closes [#614](https://github.com/WTW-IM/es-components/issues/614)

## <small>21.6.82-pre-prod.4 (2022-05-09)</small>

- Merge pull request #613 from WTW-IM/drawers-fix ([54d58d8](https://github.com/WTW-IM/es-components/commit/54d58d8)), closes [#613](https://github.com/WTW-IM/es-components/issues/613)

## <small>21.6.82-pre-prod.3 (2022-05-06)</small>

- Merge pull request #611 from WTW-IM/replace-master-with-main ([d32a212](https://github.com/WTW-IM/es-components/commit/d32a212)), closes [#611](https://github.com/WTW-IM/es-components/issues/611)

## <small>21.6.82-pre-prod.2 (2022-05-05)</small>

- Merge pull request #612 from WTW-IM/more-flexible-drawers ([b3f8136](https://github.com/WTW-IM/es-components/commit/b3f8136)), closes [#612](https://github.com/WTW-IM/es-components/issues/612)

## <small>21.6.82-pre-prod.0 (2022-01-31)</small>

- Merge pull request #602 from WTW-IM/dependabot/npm_and_yarn/packages/es-components/follow-redirects- ([5d1291d](https://github.com/WTW-IM/es-components/commit/5d1291d)), closes [#602](https://github.com/WTW-IM/es-components/issues/602)

## <small>21.6.81 (2022-01-26)</small>

- Fix: corrects via theme danger/warning icons. ([49322f1](https://github.com/WTW-IM/es-components/commit/49322f1))

## <small>21.6.81-pre-prod.2 (2022-01-31)</small>

- Merge pull request #598 from WTW-IM/dependabot/npm_and_yarn/packages/es-components/follow-redirects- ([86b4b58](https://github.com/WTW-IM/es-components/commit/86b4b58)), closes [#598](https://github.com/WTW-IM/es-components/issues/598)

## <small>21.6.81-pre-prod.1 (2022-01-31)</small>

- Merge pull request #600 from WTW-IM/tab-panel-null-check ([fa065c8](https://github.com/WTW-IM/es-components/commit/fa065c8)), closes [#600](https://github.com/WTW-IM/es-components/issues/600)

## <small>21.6.81-pre-prod.0 (2022-01-26)</small>

- Merging master into pre-prod [skip-release](<[f45da40](https://github.com/WTW-IM/es-components/commit/f45da40)>)

## <small>21.6.78 (2021-11-12) & 21.6.78-pre-prod.5 (2021-11-12)</small>

- Merge remote-tracking branch 'origin/master' into pre-prod ([db3a00e](https://github.com/WTW-IM/es-components/commit/db3a00e))

## <small>21.6.78-pre-prod.6 (2021-11-18)</small>

- [skip ci] v21.6.78-pre-prod.6 ([6e31f4e](https://github.com/WTW-IM/es-components/commit/6e31f4e))

## <small>21.6.78-pre-prod.5 (2021-11-12)</small>

- [skip ci] v21.6.78-pre-prod.5 ([c719ba2](https://github.com/WTW-IM/es-components/commit/c719ba2))

## <small>21.6.78-pre-prod.6 (2021-11-18)</small>

- Merge pull request #593 from matneyx/disable-close-on-scroll ([b723713](https://github.com/WTW-IM/es-components/commit/b723713)), closes [#593](https://github.com/WTW-IM/es-components/issues/593)

## <small>21.6.77 (2021-10-22)</small>

- [skip ci] v21.6.77 ([4e07bf1](https://github.com/WTW-IM/es-components/commit/4e07bf1))

## <small>21.6.77-pre-prod.4 (2021-11-11)</small>

- Merge pull request #591 from WTW-IM/WE-15333-safari-sliding-pane-focus ([4962f45](https://github.com/WTW-IM/es-components/commit/4962f45)), closes [#591](https://github.com/WTW-IM/es-components/issues/591)

## <small>21.6.77-pre-prod.3 (2021-11-03)</small>

- Merge pull request #590 from WTW-IM/fix-focus-outline ([69d2920](https://github.com/WTW-IM/es-components/commit/69d2920)), closes [#590](https://github.com/WTW-IM/es-components/issues/590)

## <small>21.6.77-pre-prod.2 (2021-11-03)</small>

- Merge pull request #589 from WTW-IM/accessibility-audit-items ([d9a8579](https://github.com/WTW-IM/es-components/commit/d9a8579)), closes [#589](https://github.com/WTW-IM/es-components/issues/589)

## <small>21.6.77-pre-prod.1 (2021-10-22)</small>

- Merging master into pre-prod [skip-release](<[ca0b6a6](https://github.com/WTW-IM/es-components/commit/ca0b6a6)>)

## <small>21.6.77 (2021-10-22)</small>

- Build: bumping prerelease version to unreleased minor ([33d2637](https://github.com/WTW-IM/es-components/commit/33d2637))

## <small>21.6.76-pre-prod.3 (2021-10-22)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.76-pre-prod.2 (2021-10-22)</small>

- Build: updating to latest jest and ensuring passing tests ([be636e8](https://github.com/WTW-IM/es-components/commit/be636e8))

## <small>21.6.76-pre-prod.1 (2021-10-22)</small>

- Merge pull request #587 from WTW-IM/update-semantic-colors ([f6b34b0](https://github.com/WTW-IM/es-components/commit/f6b34b0)), closes [#587](https://github.com/WTW-IM/es-components/issues/587)

## <small>21.6.76-pre-prod.0 (2021-09-28)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.75 (2021-08-18)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.74-pre-prod.0 (2021-08-17)</small>

- Merge pull request #577 from WTW-IM/WE-13501-screenreader-read-tooltip-when-opened ([8e0edbc](https://github.com/WTW-IM/es-components/commit/8e0edbc)), closes [#577](https://github.com/WTW-IM/es-components/issues/577)

## <small>21.6.73-pre-prod.3 (2021-08-16)</small>

- Merge remote-tracking branch 'origin/master' into pre-prod ([16b25c5](https://github.com/WTW-IM/es-components/commit/16b25c5))

## <small>21.6.73 (2021-08-13)</small>

- [skip ci] v21.6.73 ([a078d03](https://github.com/WTW-IM/es-components/commit/a078d03))

## <small>21.6.73-pre-prod.2 (2021-08-16)</small>

- Merge pull request #575 from WTW-IM/icons-fix ([b198dd6](https://github.com/WTW-IM/es-components/commit/b198dd6)), closes [#575](https://github.com/WTW-IM/es-components/issues/575)

## <small>21.6.73-pre-prod.1 (2021-08-16)</small>

- Merge pull request #573 from WTW-IM/ensure-icons-in-window ([1efa8c6](https://github.com/WTW-IM/es-components/commit/1efa8c6)), closes [#573](https://github.com/WTW-IM/es-components/issues/573)

## <small>21.6.73-pre-prod.0 (2021-08-13)</small>

## <small>21.6.73 (2021-08-13)</small>

- [skip-ci][skip-release] Merge branch 'pre-prod' of github.com:WTW-IM/es-components ([600adfd](https://github.com/WTW-IM/es-components/commit/600adfd))

## <small>21.6.72 (2021-06-24)</small>

- [skip ci] v21.6.72 ([c8136b7](https://github.com/WTW-IM/es-components/commit/c8136b7))

## <small>21.6.72-pre-prod.1 (2021-08-10)</small>

- Merge pull request #569 from Celestios/14049-uncaught-type-error ([72cb168](https://github.com/WTW-IM/es-components/commit/72cb168)), closes [#569](https://github.com/WTW-IM/es-components/issues/569)

## <small>21.6.72-pre-prod.0 (2021-06-24)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.72 (2021-06-24)</small>

## <small>21.6.71-pre-prod.1 (2021-06-24)</small>

- Merge pull request #565 from WTW-IM/heading-fixes ([9bb6717](https://github.com/WTW-IM/es-components/commit/9bb6717)), closes [#565](https://github.com/WTW-IM/es-components/issues/565)

## <small>21.6.70-pre-prod.0 (2021-06-07)</small>

**Note:** Version bump only for package es-components-via-theme

## <small>21.6.69 (2021-06-07)</small>

- Merge remote-tracking branch 'origin/pre-prod' ([68711d8](https://github.com/WTW-IM/es-components/commit/68711d8))

## <small>21.6.69-pre-prod.3 (2021-06-07)</small>

- Build: checking out pre-prod in preprod checkout step ([053f30d](https://github.com/WTW-IM/es-components/commit/053f30d))

## <small>21.6.69-pre-prod.2 (2021-06-07)</small>

- Build: ensuring we wait for test AND prerelease for main release ([b8c85e0](https://github.com/WTW-IM/es-components/commit/b8c85e0))

## <small>21.6.69-pre-prod.1 (2021-06-07)</small>

- Build: ensuring we release pre-prod before main ([a41d587](https://github.com/WTW-IM/es-components/commit/a41d587))

## <small>21.6.69-pre-prod.0 (2021-06-02)</small>

- Merge pull request #558 from WTW-IM/dependabot/npm_and_yarn/packages/es-components/dns-packet-1.3.4 ([9c54a7e](https://github.com/WTW-IM/es-components/commit/9c54a7e)), closes [#558](https://github.com/WTW-IM/es-components/issues/558)

## <small>21.6.68 (2021-05-21)</small>

- Merge pull request #556 from WTW-IM/pre-prod ([b72d2c3](https://github.com/WTW-IM/es-components/commit/b72d2c3)), closes [#556](https://github.com/WTW-IM/es-components/issues/556)

## <small>21.6.68-pre-prod.4 (2021-05-21)</small>

- Merge pull request #555 from WTW-IM/pre-prod ([8517c87](https://github.com/WTW-IM/es-components/commit/8517c87)), closes [#555](https://github.com/WTW-IM/es-components/issues/555)

## <small>21.6.68-pre-prod.3 (2021-05-21)</small>

- Build: ensuring our package-lock includes local dependencies ([5f51a64](https://github.com/WTW-IM/es-components/commit/5f51a64))

## <small>21.6.68-pre-prod.2 (2021-05-21)</small>

- Build: remove preprod to master pr workflow ([d20638c](https://github.com/WTW-IM/es-components/commit/d20638c))

## <small>21.6.68-pre-prod.1 (2021-05-20)</small>

- Build: set pr target to master ([05949e3](https://github.com/WTW-IM/es-components/commit/05949e3))

## <small>21.6.68-pre-prod.0 (2021-05-20)</small>

- Build: migrate adapter to npm package ([a93e869](https://github.com/WTW-IM/es-components/commit/a93e869))

<a name="21.6.67"></a>

## <small>21.6.67 (2021-05-18)</small>

- Merge pull request #551 from WTW-IM/react-update-revert ([607946b](https://github.com/WTW-IM/es-components/commit/607946b)), closes [#551](https://github.com/WTW-IM/es-components/issues/551) [#550](https://github.com/WTW-IM/es-components/issues/550)

<a name="21.6.66"></a>

## <small>21.6.66 (2021-05-18)</small>

- Merge pull request #550 from WTW-IM/react-update ([b36f5ab](https://github.com/WTW-IM/es-components/commit/b36f5ab)), closes [#550](https://github.com/WTW-IM/es-components/issues/550)

<a name="21.6.65"></a>

## <small>21.6.65 (2021-05-14)</small>

- Merge pull request #549 from WTW-IM/revert-react-update ([30aa35c](https://github.com/WTW-IM/es-components/commit/30aa35c)), closes [#549](https://github.com/WTW-IM/es-components/issues/549) [#535](https://github.com/WTW-IM/es-components/issues/535)

<a name="21.6.64"></a>

## <small>21.6.64 (2021-05-14)</small>

- Merge pull request #535 from WTW-IM/react17 ([32600da](https://github.com/WTW-IM/es-components/commit/32600da)), closes [#535](https://github.com/WTW-IM/es-components/issues/535)

<a name="21.6.63"></a>

## <small>21.6.63 (2021-04-29)</small>

- Merge pull request #541 from aabenoja/popover-proptypes-fix ([7be8bcb](https://github.com/WTW-IM/es-components/commit/7be8bcb)), closes [#541](https://github.com/WTW-IM/es-components/issues/541)

<a name="21.6.62"></a>

## <small>21.6.62 (2021-04-28)</small>

- Merge pull request #540 from WTW-IM/fix-keep-together-default ([012953d](https://github.com/WTW-IM/es-components/commit/012953d)), closes [#540](https://github.com/WTW-IM/es-components/issues/540)

<a name="21.6.61"></a>

## <small>21.6.61 (2021-04-28)</small>

- Merge pull request #538 from WTW-IM/sliding-pane-customization ([f147c0e](https://github.com/WTW-IM/es-components/commit/f147c0e)), closes [#538](https://github.com/WTW-IM/es-components/issues/538)

<a name="21.6.60"></a>

## <small>21.6.60 (2021-04-27)</small>

- Merge pull request #536 from aabenoja/popover-content-render-func ([bbc229a](https://github.com/WTW-IM/es-components/commit/bbc229a)), closes [#536](https://github.com/WTW-IM/es-components/issues/536)

<a name="21.6.59"></a>

## <small>21.6.59 (2021-04-27)</small>

- Build: fix broken ci syntax ([a6cd0e0](https://github.com/WTW-IM/es-components/commit/a6cd0e0))

<a name="21.6.58"></a>

## <small>21.6.58 (2021-04-27)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.57"></a>

## <small>21.6.57 (2021-04-27)</small>

- Build: fix docs commit process ([4b9e976](https://github.com/WTW-IM/es-components/commit/4b9e976))

<a name="21.6.56"></a>

## <small>21.6.56 (2021-04-27)</small>

- Build: parallize docs and npm publish and skip ci ([c801e45](https://github.com/WTW-IM/es-components/commit/c801e45))

<a name="21.6.55"></a>

## <small>21.6.55 (2021-04-27)</small>

- Build: restrict branches runs to master ([b082d15](https://github.com/WTW-IM/es-components/commit/b082d15))

<a name="21.6.52"></a>

## <small>21.6.52 (2021-04-27)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.51"></a>

## <small>21.6.51 (2021-03-18)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.50"></a>

## <small>21.6.50 (2021-03-18)</small>

- Build: updating version in package-lock files ([5d5ed3a](https://github.com/WTW-IM/es-components/commit/5d5ed3a))

<a name="21.6.49"></a>

## <small>21.6.49 (2021-02-25)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.48"></a>

## <small>21.6.48 (2021-02-24)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.47"></a>

## <small>21.6.47 (2021-02-24)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.46"></a>

## <small>21.6.46 (2021-02-24)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.45"></a>

## <small>21.6.45 (2021-02-17)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.44"></a>

## <small>21.6.44 (2021-02-17)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.43"></a>

## <small>21.6.43 (2021-02-16)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.42"></a>

## <small>21.6.42 (2021-02-12)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.41"></a>

## <small>21.6.41 (2021-02-08)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.40"></a>

## <small>21.6.40 (2021-02-08)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.39"></a>

## <small>21.6.39 (2021-02-04)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.38"></a>

## <small>21.6.38 (2021-02-03)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.37"></a>

## <small>21.6.37 (2021-02-03)</small>

**Note:** Version bump only for package es-components-via-theme

<a name="21.6.36"></a>

## <small>21.6.36 (2021-02-03)</small>

**Note:** Version bump only for package es-components-via-theme

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [21.4.0](https://github.com/WTW-IM/es-components/compare/v21.3.1...v21.4.0) (2020-06-10)

### New

- adding the IconButton component ([95ff055f3669cc96fa4f45665ea503f03c5e50cf](https://github.com/WTW-IM/es-components/commit/95ff055f3669cc96fa4f45665ea503f03c5e50cf))

# [21.3.0](https://github.com/WTW-IM/es-components/compare/v21.2.2...v21.3.0) (2020-06-05)

### New

- prompt for read aloud and do not read aloud text. (refs TW-56968) ([cc2692d8113406b1495b3b1873067272f9b62311](https://github.com/WTW-IM/es-components/commit/cc2692d8113406b1495b3b1873067272f9b62311))

### Update

- update Prompt colors (refs: TW-56968) ([a2e59c522b96e5c7d48b03a0ef82ea69cd27c6d6](https://github.com/WTW-IM/es-components/commit/a2e59c522b96e5c7d48b03a0ef82ea69cd27c6d6))

## [19.0.107](https://github.com/WTW-IM/es-components/compare/v19.0.106...v19.0.107) (2019-12-12)

### Update

- warning sign uses circle instead of triangle ([8d608022771d51474c66221d9a57b18a8269c80e](https://github.com/WTW-IM/es-components/commit/8d608022771d51474c66221d9a57b18a8269c80e))

## [21.0.4](https://github.com/WTW-IM/es-components/compare/v21.0.3...v21.0.4) (2020-04-17)

### Fix

- reverting to longhand prop assignement in themes to fix IE ([e3b1d799a4b9fa700bfd27a81391a50c48ec8d59](https://github.com/WTW-IM/es-components/commit/e3b1d799a4b9fa700bfd27a81391a50c48ec8d59))

# [21.0.0](https://github.com/WTW-IM/es-components/compare/v20.0.0...v21.0.0) (2020-04-09)

### Breaking

- version bumping themes ([3e0a863164b37facb3fc33041c99018a97798f0a](https://github.com/WTW-IM/es-components/commit/3e0a863164b37facb3fc33041c99018a97798f0a))

# [20.0.0](https://github.com/WTW-IM/es-components/compare/v19.1.7...v20.0.0) (2020-04-09)

### Breaking

- extensive theme color changes, renaming of brand colors ([679011e866fd793e48fe428d5fc43758c8c81bcf](https://github.com/WTW-IM/es-components/commit/679011e866fd793e48fe428d5fc43758c8c81bcf))
- theme.size -> theme.font, headingSizes moved ([c7b98fef009590378649177b4620450d8efff4ae](https://github.com/WTW-IM/es-components/commit/c7b98fef009590378649177b4620450d8efff4ae))

### New

- migration from v1 to v2 guide ([7c3c16b2f3769efc5b8ce847cad528f2e7c350e6](https://github.com/WTW-IM/es-components/commit/7c3c16b2f3769efc5b8ce847cad528f2e7c350e6))

### Update

- answerButton to coordinate with button changes ([0b3761155900e8642da0cc034e32d2b4f783525f](https://github.com/WTW-IM/es-components/commit/0b3761155900e8642da0cc034e32d2b4f783525f))
- answerGroup focus color, heading theme use ([63163943938d7486ed34e6d39c2e00906170daa2](https://github.com/WTW-IM/es-components/commit/63163943938d7486ed34e6d39c2e00906170daa2))
- finishing base Button changes ([33571bbbc8902b03f6a91e5683cd037fb7254ebc](https://github.com/WTW-IM/es-components/commit/33571bbbc8902b03f6a91e5683cd037fb7254ebc))
- linkButton calcs hover color, removed hover colors from theme ([07da1e1d60c459071d99efaa3223a576d40001fe](https://github.com/WTW-IM/es-components/commit/07da1e1d60c459071d99efaa3223a576d40001fe))
- outlineButton styles ([ac7cbb1f5da08ec0a2f56855af25a31bed6f016b](https://github.com/WTW-IM/es-components/commit/ac7cbb1f5da08ec0a2f56855af25a31bed6f016b))
- starting new button styles ([4151e7a7bc5e3f683df618953d9d07e53cb87c81](https://github.com/WTW-IM/es-components/commit/4151e7a7bc5e3f683df618953d9d07e53cb87c81))

# [19.1.0](https://github.com/WTW-IM/es-components/compare/v19.0.121...v19.1.0) (2020-03-26)

### New

- prompt for read aloud and do not read aloud text. (refs TW-56968) ([cc2692d8113406b1495b3b1873067272f9b62311](https://github.com/WTW-IM/es-components/commit/cc2692d8113406b1495b3b1873067272f9b62311))

## <small>19.0.107 (2019-12-12)</small>

- Update: warning sign uses circle instead of triangle ([8d60802](https://github.com/WTW-IM/es-components/commit/8d60802))

## <small>19.0.63 (2019-07-11)</small>

- Update: moved validation icons to AdditionalHelp ([702877c](https://github.com/WTW-IM/es-components/commit/702877c))

## <small>19.0.59 (2019-06-26)</small>

- New: responsiveTable and table options ([dd5cc7e](https://github.com/WTW-IM/es-components/commit/dd5cc7e))

## <small>19.0.50 (2019-06-06)</small>

- New: create a new button style object for link buttons ([adbaf13](https://github.com/WTW-IM/es-components/commit/adbaf13))

## <small>19.0.45 (2019-06-05)</small>

- New: add inherited button style type ([19e33c2](https://github.com/WTW-IM/es-components/commit/19e33c2))

## <small>19.0.28 (2019-04-17)</small>

- Fix: (chpink) Change danger icon; fix icon centering ([6c19230](https://github.com/WTW-IM/es-components/commit/6c19230))

## 19.0.0 (2019-03-06)

- Update: change notification danger icon ([20ea50e](https://github.com/WTW-IM/es-components/commit/20ea50e))
- Update: removed unused classnames dependency ([ea75f3b](https://github.com/WTW-IM/es-components/commit/ea75f3b))
- Merge branch 'master' into next ([1e72337](https://github.com/WTW-IM/es-components/commit/1e72337))
- v19.0.0-alpha ([8da53d5](https://github.com/WTW-IM/es-components/commit/8da53d5))

## <small>18.0.22 (2019-01-31)</small>

- Update: adds software blue color ([1a68ac3](https://github.com/WTW-IM/es-components/commit/1a68ac3))
