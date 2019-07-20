#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */

const fs = require('fs');
const cheerio = require('cheerio');
const formatDate = require('date-fns/format');
const parseDate = require('date-fns/parse');
const isValid = require('date-fns/isValid');

if (process.argv.length !== 3 && process.argv.length !== 4) {
  console.error('usage: node parse-schedule.js input.html [output.json]');
  process.exit(1);
}

const inputFilename = process.argv[2] === '-' ? '/dev/stdin' : process.argv[2];
const outputFilename = process.argv.length === 3 ? 'schedule.json' : process.argv[3];

fs.readFile(inputFilename, 'utf8', (err, data) => {
  if (err) throw err;

  const $ = cheerio.load(data);
  const article = $('article.content_section').first();
  const title = $('h3', article).first().text();
  const asof = $('p', article).first().text();

  const rows = $('table', article).first().find('tr');
  const exams = [];
  let course;
  let rowspan = 0;
  for (let i = 1; i < rows.length; i++, rowspan--) {
    const cols = $('td', rows[i]).toArray();
    if (rowspan < 1) {
      course = getCell('course', $(cols[0])).course;
      rowspan = parseInt($(cols[0]).attr('rowspan')) || 1;
      cols.shift();
    }
    let deleted = {};
    if ($(cols[0]).has('del').length) {
      console.error('deleted section:', course + '-' + $(cols[0]).text());
      deleted = { deleted: true };
    }
    const exam = {
      course,
      ...deleted,
      ...getCell('section', $(cols[0])),
      ...getCell('instructor', $(cols[1])),
      ...getCell('date', $(cols[2])),
      ...getCell('start_time', $(cols[3])),
      ...getCell('end_time', $(cols[5])),
      ...getCell('building', $(cols[6])),
      ...getCell('room', $(cols[7]))
    };
    exams.push(exam);
  }

  const json = JSON.stringify({ title, asof, exams });
  if (outputFilename === '-') {
    process.stdout.write(json);
  } else {
    fs.writeFileSync(outputFilename, json);
  }
});

function getCell(key, col) {
  const conv = key === 'date' ? getDate : text => text.trim();
  const p = col.find('p');
  if (p.length === 0) {
    return { [key]: conv(col.text()) };
  }
  const text = p.not(':has(del)').last().text();
  const del = p.find('del');
  if (del.length === 0) {
    return { [key]: conv(text) };
  }
  if (text === '') {
    console.error('new text is empty');
    return { [key]: conv(del.last().text()) };
  }
  if (text === del.last().text()) {
    console.error('same text as deleted:', text);
  }
  return {
    [key]: conv(text),
    ['del_' + key]: conv(del.last().text())
  };
}

function getDate(text) {
  let date = parseDate(text, 'EEE, MMM d, yyyy', new Date());
  if (!isValid(date)) {
    date = parseDate(text, 'EEE, MMM, d, yyyy', new Date());
  }
  if (!isValid(date)) {
    date = parseDate(text.replace(/^Tues,/, 'Tue,').replace(/\u00a0/, ''), 'EEE, MMM, d, yyyy', new Date());
  }
  if (!isValid(date)) {
    console.error('failed to parse date:', text);
    return text;
  }
  return formatDate(date, 'EEE, MMM dd, yyyy');
}
