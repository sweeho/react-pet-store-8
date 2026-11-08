#!/bin/bash
# Builds the Pet Store EARs with Ant, configures the J2EE RI, deploys, then stays in the foreground.
set -euo pipefail

apt-get update -qq && apt-get install -y -qq ant curl >/dev/null

# The legacy source is read-only; build from a copy.
cp -r /legacy-source/app /work/app
cd /work/app
export ANT_OPTS="-Dj2ee.home=$J2EE_HOME"

# Compile and assemble the EARs (src/build.xml target "core").
( cd src && ant -Dj2ee.home="$J2EE_HOME" core )

# Start the RI's Cloudscape database and server, create queues, users and tables, then deploy.
"$J2EE_HOME/bin/cloudscape" -start &
sleep 15
"$J2EE_HOME/bin/j2ee" -verbose &
J2EE_PID=$!
sleep 45
ant -Dj2ee.home="$J2EE_HOME" -Dj2ee-script-suffix= -f setup.xml core
ant -Dj2ee.home="$J2EE_HOME" -Dj2ee-script-suffix= -f setup.xml deploy

wait "$J2EE_PID"
