import fs from 'fs-extra';
import handlebars from 'handlebars';
import path from 'path';

export class HandlebarsProvider {
  public compileTemplate(templateName: string, data: any): string {
    const filePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
    const templateFile = fs.readFileSync(filePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateFile);
    return compiledTemplate(data);
  }
}
