import fs from "fs";
import fetch from "node-fetch";
import { PDFDocument } from "pdf-lib";

const pdfUrl = "https://mag.wcoomd.org/uploads/2018/05/blank.pdf";
const pngUrl = "https://cdn.freebiesupply.com/logos/large/2x/thomson-reuters-2-logo-png-transparent.png";

const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());

const pdfDoc = await PDFDocument.load(pdfBytes);
const pages = pdfDoc.getPages();

const pngImage = await pdfDoc.embedPng(pngImageBytes);

pages.forEach((page) => {
  page.drawImage(pngImage, {
    x: page.getWidth() / 2,
    y: page.getHeight() / 10,
    width: 200,
    height: 25,
  });
});

const markedPdf = await pdfDoc.save();

fs.writeFile("markedPdf.pdf", markedPdf, (e) => console.log(e));
