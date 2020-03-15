#!/bin/bash

echo "Running tests"
./gradlew -Dtest.single=me.toptas.rssreader.UnitTestSuite clean test

echo "Creating apk"
./gradlew assembleDebug
