import subprocess

#
# This file runs our unit tests by calling the command
# python -m unittest discover in the src/ directory.
#
# These tests all pass on our current build, but are directly
# linked to our database being served locally rather than our
# deployed database, in order to check for errors before
# deployment. This file being run without the database running
# locally will fail a majority of the test cases for this reason.
#

subprocess.call(["python", "-m", "unittest", "discover"], cwd="src")
