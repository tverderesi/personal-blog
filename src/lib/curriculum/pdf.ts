import PDFDocument from 'pdfkit';
import type { Curriculum } from './data';
import { curriculumKeywords } from './data';

const margins = {
	top: 52,
	bottom: 52,
	left: 54,
	right: 54,
};

const colors = {
	text: '#111111',
	muted: '#404040',
	accent: '#b91c1c',
	link: '#0645ad',
	rule: '#111111',
};

const pageWidth = 612;
const contentWidth = pageWidth - margins.left - margins.right;

type PdfDoc = InstanceType<typeof PDFDocument>;

const lineGap = 3;

const ensureSpace = (doc: PdfDoc, height = 90) => {
	if (doc.y + height > doc.page.height - margins.bottom) {
		doc.addPage();
	}
};

const text = (doc: PdfDoc, value: string, options: PDFKit.Mixins.TextOptions = {}) => {
	doc
		.fillColor(colors.text)
		.font('Helvetica')
		.fontSize(10)
		.text(value, {
			width: contentWidth,
			lineGap,
			...options,
		});
};

const section = (doc: PdfDoc, title: string) => {
	ensureSpace(doc, 72);
	doc.moveDown(0.9);
	doc.fillColor(colors.accent).font('Helvetica-Bold').fontSize(12).text(title.toUpperCase(), { width: contentWidth, lineGap: 2 });
	doc
		.moveTo(margins.left, doc.y + 2)
		.lineTo(margins.left + contentWidth, doc.y + 2)
		.strokeColor(colors.rule)
		.lineWidth(1)
		.stroke();
	doc.moveDown(0.6);
};

const listItem = (doc: PdfDoc, value: string) => {
	ensureSpace(doc, 34);
	text(doc, `- ${value}`, { indent: 10 });
};

const labelValue = (doc: PdfDoc, label: string, value?: string) => {
	if (!value) return;
	ensureSpace(doc, 24);
	doc.fillColor(colors.text).font('Helvetica-Bold').fontSize(10).text(`${label}: `, { continued: true, lineGap });
	doc.fillColor(colors.text).font('Helvetica').fontSize(10).text(value, { width: contentWidth, lineGap });
};

const linkLine = (doc: PdfDoc, label: string, url: string) => {
	ensureSpace(doc, 24);
	doc.fillColor(colors.link).font('Helvetica').fontSize(10).text(`${label}: ${url}`, {
		width: contentWidth,
		lineGap,
		link: url,
		underline: true,
	});
};

const renderExperience = (doc: PdfDoc, curriculum: Curriculum) => {
	section(doc, curriculum.labels.sections.experience);

	curriculum.experience.forEach((item) => {
		ensureSpace(doc, 110);
		doc.fillColor(colors.text).font('Helvetica-Bold').fontSize(11).text(`${item.company} - ${item.role}`, { width: contentWidth, lineGap });
		doc
			.fillColor(colors.muted)
			.font('Helvetica')
			.fontSize(9.5)
			.text([item.location, item.period].filter(Boolean).join(' | '), { width: contentWidth, lineGap });

		if (item.summary) {
			text(doc, item.summary);
		}

		item.bullets.forEach((bullet) => listItem(doc, bullet));

		if (item.technologies.length > 0) {
			text(doc, `${curriculum.labels.technologies}: ${item.technologies.join(', ')}`);
		}

		doc.moveDown(0.6);
	});
};

const renderProjects = (doc: PdfDoc, curriculum: Curriculum) => {
	if (curriculum.projects.length === 0) return;

	section(doc, curriculum.labels.sections.projects);

	curriculum.projects.forEach((project) => {
		ensureSpace(doc, 82);
		doc.fillColor(colors.text).font('Helvetica-Bold').fontSize(11).text(project.name, { width: contentWidth, lineGap });
		if (project.company) {
			doc.fillColor(colors.muted).font('Helvetica').fontSize(9.5).text(project.company, { width: contentWidth, lineGap });
		}
		text(doc, project.description);
		if (project.technologies.length > 0) {
			text(doc, `${curriculum.labels.technologies}: ${project.technologies.join(', ')}`);
		}
		if (project.url) {
			linkLine(doc, curriculum.labels.link, project.url);
		}
		doc.moveDown(0.5);
	});
};

const renderSkills = (doc: PdfDoc, curriculum: Curriculum) => {
	section(doc, curriculum.labels.sections.skills);
	Object.entries(curriculum.skills).forEach(([category, items]) => {
		if (items.length === 0) return;
		text(doc, `${category}: ${items.join(', ')}`);
	});
};

const renderEducation = (doc: PdfDoc, curriculum: Curriculum) => {
	if (curriculum.education.length === 0) return;

	section(doc, curriculum.labels.sections.education);
	curriculum.education.forEach((item) => {
		ensureSpace(doc, 50);
		doc.fillColor(colors.text).font('Helvetica-Bold').fontSize(10.5).text(item.title, { width: contentWidth, lineGap });
		text(doc, `${item.place} | ${item.time}`);
		if (item.description) text(doc, item.description);
		doc.moveDown(0.4);
	});
};

const renderCourses = (doc: PdfDoc, curriculum: Curriculum) => {
	if (curriculum.courses.length === 0) return;

	section(doc, curriculum.labels.sections.courses);
	curriculum.courses.forEach((item) => {
		ensureSpace(doc, 56);
		doc.fillColor(colors.text).font('Helvetica-Bold').fontSize(10.5).text(item.title, { width: contentWidth, lineGap });
		text(doc, `${item.place} | ${item.time}`);
		if (item.credentialID) text(doc, `Credential ID: ${item.credentialID}`);
		if (item.description) text(doc, item.description);
		doc.moveDown(0.4);
	});
};

const renderLanguages = (doc: PdfDoc, curriculum: Curriculum) => {
	if (curriculum.languages.length === 0) return;

	section(doc, curriculum.labels.sections.languages);
	curriculum.languages.forEach((language) => {
		text(doc, `${language.title}: ${language.levelName}`);
	});
};

export const generateCurriculumPdf = (curriculum: Curriculum) =>
	new Promise<Buffer>((resolve, reject) => {
		const doc = new PDFDocument({
			size: 'LETTER',
			margins,
			compress: false,
			info: {
				Title: curriculum.labels.title,
				Author: 'Thomas Verderesi',
				Subject: curriculum.labels.subject,
				Keywords: curriculumKeywords.join(', '),
				Creator: 'Astro + PDFKit',
			},
		});

		const chunks: Buffer[] = [];

		doc.on('data', (chunk: Buffer) => chunks.push(chunk));
		doc.on('end', () => resolve(Buffer.concat(chunks)));
		doc.on('error', reject);

		doc.fillColor(colors.text).font('Helvetica-Bold').fontSize(21).text(curriculum.profile.name, { width: contentWidth, lineGap: 2 });
		doc.fillColor(colors.accent).font('Helvetica-Bold').fontSize(12).text(curriculum.profile.headline, { width: contentWidth, lineGap: 2 });
		doc.moveDown(0.8);

		labelValue(doc, curriculum.labels.contact.name, curriculum.profile.name);
		labelValue(doc, curriculum.labels.contact.title, curriculum.profile.headline);
		labelValue(doc, curriculum.labels.contact.location, curriculum.profile.location);
		labelValue(doc, curriculum.labels.contact.email, curriculum.profile.email);
		labelValue(doc, curriculum.labels.contact.website, curriculum.profile.links.find((link) => link.label === 'Website')?.url);

		section(doc, curriculum.labels.sections.links);
		curriculum.profile.links.forEach((link) => linkLine(doc, link.label, link.url));

		section(doc, curriculum.labels.sections.summary);
		text(doc, curriculum.profile.summary);

		renderExperience(doc, curriculum);
		renderProjects(doc, curriculum);
		renderSkills(doc, curriculum);
		renderEducation(doc, curriculum);
		renderCourses(doc, curriculum);
		renderLanguages(doc, curriculum);

		doc.end();
	});
