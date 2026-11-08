# Legacy runtime: Java Pet Store 1.3.2

Starts the legacy J2EE application (storefront, order processing center, supplier,
admin web) on the Sun J2EE 1.3.1 Reference Implementation, which bundles its own
Cloudscape database and JMS provider.

## Start

```sh
export J2EE_RI_DIR=/path/to/j2sdkee1.3.1          # required, see below
export LEGACY_SOURCE_DIR=/path/to/legacy-source   # optional
docker compose -f .vortex/legacy-runtime/compose.yaml up
```

`LEGACY_SOURCE_DIR` defaults to `legacy-source/` at the repository root. That
directory is not on `dev`; it is on branch `vortex/legacy-spec/sx-0001`. Check it
out first, for example `git worktree add ../legacy vortex/legacy-spec/sx-0001` and
point `LEGACY_SOURCE_DIR` at `../legacy/legacy-source`.

The container compiles the source with Ant (`app/src/build.xml`, target `core`;
the Ant bundled with the original is not in the repository, so the container
installs Ant), starts the RI, runs `app/setup.xml` (JMS queues, users, databases)
and deploys the EARs. The legacy source is mounted read-only and never changed.
Allow several minutes; the container is healthy when the storefront answers.

## URL for the acceptance suite

`http://localhost:8000/petstore/` (override the host port with `LEGACY_PORT`).
Other applications on the same port: `/opc`, `/supplier`, `/admin`.

## Needed but not in the repository

- The Sun **J2EE 1.3.1 Reference Implementation** (`j2sdkee1.3.1`), extracted on
  the host and passed as `J2EE_RI_DIR`. It needs Sun's licence acceptance and is
  not redistributable here.
- The original docs call for Java 1.4. The container uses JDK 8 because no 1.4
  image is available; this has not been run, so if the RI refuses to start on
  JDK 8, supply a 1.4 JDK and change `image` accordingly.
