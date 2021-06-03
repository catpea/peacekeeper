#!/usr/bin/env node

import { configuration } from "./configuration.js";
import Task from "./src/objects/Task.js";

const ensureBaseDirs = new Task("Ensure Base Dirs");
const testRawIntegrity = new Task("Test Raw Integrity", ensureBaseDirs);
const initializeRecord = new Task("Initialize Record", testRawIntegrity);

const processYaml = new Task("Process Yaml");
const processMd = new Task("Process Md");
const processHtml = new Task("Process Html");
const processData = new Task("Process Data", processYaml, processMd, processHtml);

const ensureBootstrap = new Task("Ensure Bootstrap");
const ensurePrint = new Task("Ensure Print");
const ensureText = new Task("Ensure Text");
const ensureImages = new Task("Ensure Images");
const ensureLinks = new Task("Ensure Links");
const ensureData = new Task("Ensure Data", ensureBootstrap, ensurePrint, ensureText, ensureImages, ensureLinks);

const validateRecordSchema = new Task("Validate Record Schema");
const verifyCacheIntegrity = new Task("Verify Cache Integrity");
const saveRecord = new Task("Save Record", initializeRecord, processData, ensureData, validateRecordSchema, verifyCacheIntegrity);

const downloadYoutubeThumbnails = new Task("Download YouTube Thumbnails");
const createCoverFromThumbnails = new Task("Create Cover From Thumbnails");

const processThumbnails = new Task("Process Thumbnails", downloadYoutubeThumbnails, createCoverFromThumbnails);
const resizeCoverImages = new Task("Resize Cover Images");
const verifyPresenceOfImages = new Task("Verify Presence Of Images");
const processImages = new Task("Process Images", processThumbnails, resizeCoverImages, verifyPresenceOfImages);

const makeSo = new Task("makeSo", saveRecord, processImages);
const validateSoSchema = new Task("Validate So Schema");

const copyAttachments = new Task("Copy Attachments");
const copyLocalLinks = new Task("Copy Local Links");
const copyImages = new Task("Copy Images");
const copyNarrations = new Task("Copy Narrations");
const copyData = new Task("Copy Data", copyAttachments, copyLocalLinks, copyImages, copyNarrations);

const createMirror = new Task("Create Mirror");
const createWebsite = new Task("Create Website");
const verifyWebsite = new Task("Verify Website");
const makeWebsite = new Task("Make Website", createMirror, createWebsite, verifyWebsite);


const publishMirrorToGithub = new Task("Publish Mirror Website To Github");
const publishMirrors = new Task("Publish Mirrors", publishMirrorToGithub);

const publishMainWebsiteToGithub = new Task("Publish Main Website To Github");
const publishMainWebsiteToVercel = new Task("Publish Main Website To Vercel");
const publishMainWebsiteToSurge = new Task("Publish Main Website To Surge");
const publishMainWebsites = new Task("Publish Main Websites", publishMainWebsiteToGithub, publishMainWebsiteToVercel, publishMainWebsiteToSurge );

const publish = new Task("Publish", publishMirrors, publishMainWebsites);

const main = new Task("Main", makeSo, validateSoSchema, copyData, makeWebsite, publish);

await main.make();
