[![Azin-DevOps: Semantic-Release](https://img.shields.io/badge/Azin--DevOps-Semantic--Release-informational.svg?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD7SURBVChTY/j37/+3H38+ff2FBwEV/Pv3j+Hzt1+HLrxYvPPOwu23sSKg1MELL4DKGF69/z59/Y2k9iOxzYewoqT2w1PXXQcqAymduPpqZMOBwKq97kU73ZAQkBtQuTei4UD/yqtQpZNWXw2r3Z/Ve+w/BsibcCK0dn//qisoStO6j0LlkQBQ/2BUmonNW7n9x1GUAgMrov4AELUuutgw7zwcAbnAQAyvP9C/ChxYL999n7zmWkzTwbC6/cCgRUNAweimg0CzQEo/fP656cij7uWXO5Zcwoq6l13eePgRUBnDn7//3n768eT11yevvoJINAQWfPvxx5+//wCvpcSv3A4ENwAAAABJRU5ErkJggg==)](https://azintelecomgroup.slack.com/archives/C03220S77FE)

> Semantic-Release Cədvəli:

| COMMIT MESSAGE                                     | RELEASE TYPE |
|----------------------------------------------------| ------ |
| fix(`Fiksin predmeti`): `description`                     | Patch / Fix Update |
| perf(`Performance update predmeti`): `description`             | Patch / Performance Update |
| feat(`Feature predmeti`): `description`                       | Minor / Feature Update |
 `BREAKING CHANGE`: `description` mesaj-ın footerində yazılır   | Major / Breaking Update |

Release yaratmayan commit mesaj Cədvəli:
| COMMIT MESSAGE                                     | RELEASE TYPE |
|----------------------------------------------------| ------       |
| docs(`predmet`): `description`                     | no-release   |
| style(`predmet`): `description`                    | no-release   |
| test(`predmet`): `description`                     | no-release   |
| chore(`predmet`): `description`                    | no-release   |

**Qeyd: Nəzərə alın ki `predmet` in qeyd olunması məcburi deyil, yəni mesaj `fix: description` formatında ola bilər.**

**Qeyd: Nəzərə alın ki, qeyd olunan açar sözləri istifadə olunmadığı halda CI/CD pipeline-ları işə düşməyəcəkdir.**

## 🔗 References
[commit-analyzer](https://github.com/semantic-release/commit-analyzer)

[blog-reference](https://levelup.gitconnected.com/semantic-versioning-and-release-automation-on-gitlab-9ba16af0c21)

[semantic-release](https://github.com/semantic-release/semantic-release)