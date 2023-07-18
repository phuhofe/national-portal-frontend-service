import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@app/env';
import { LanguageObject } from '@adstate_as/flora/lib/interfaces/language-switcher.interface';

export interface LinkDefenition {
  id: HTMLLinkElement['id'];
  rel: HTMLLinkElement['rel'];
  href?: HTMLLinkElement['href'];
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  applicationIsEmbedded = environment.exportPortalComponent;

  constructor(private titleService: Title, private metaService: Meta, @Inject(DOCUMENT) private document: any) {}

  /**
   * Add or update the title tag
   */
  setTitleTag(content: string): void {
    if (!this.applicationIsEmbedded) {
      this.titleService.setTitle(content);
    }
  }

  /**
   * Add, update or delete a meta tag. Set tag.content to null to delete.
   */
  setMetaTag(tag: MetaDefinition): HTMLMetaElement | null {
    if (this.applicationIsEmbedded) {
      return null;
    }

    const selectors = [`name="${tag.name}"`, `property="${tag.property}"`];

    let selectorForExistingTag = null;
    selectors.forEach((selector) => {
      const existingTag = this.metaService.getTag(selector);
      if (existingTag && selectorForExistingTag === null) {
        selectorForExistingTag = selector;
      }
    });

    const shouldDeleteTag = !!selectorForExistingTag && tag.content === null;
    const shouldUpdateTag = !!selectorForExistingTag && !shouldDeleteTag && tag.content !== null;
    let htmlMetaElement: HTMLMetaElement = null;

    if (shouldUpdateTag) {
      htmlMetaElement = this.metaService.updateTag(tag, selectorForExistingTag);
    } else if (shouldDeleteTag) {
      this.metaService.removeTag(selectorForExistingTag);
    } else if (tag.content !== null) {
      htmlMetaElement = this.metaService.addTag(tag);
    }

    return htmlMetaElement;
  }

  /**
   * Add, update or delete a link tag. Set tag.href to null to delete.
   */
  setLinkTag(tag: LinkDefenition): HTMLLinkElement | null {
    if (this.applicationIsEmbedded) {
      return null;
    }

    let htmlLinkElement: HTMLLinkElement = null;
    const selector = `link[id="${tag.id}"]`;

    htmlLinkElement = this.document.head.querySelector(selector);

    if (tag.href === null) {
      if (!htmlLinkElement) {
        console.warn(`Couldn't find the link element with selector: ${selector}`);
      } else {
        htmlLinkElement.remove();
      }
    } else if (htmlLinkElement) {
      htmlLinkElement.setAttribute('id', tag.id);
      htmlLinkElement.setAttribute('rel', tag.rel);
      htmlLinkElement.setAttribute('href', tag.href);
    } else {
      htmlLinkElement = this.document.createElement('link');
      htmlLinkElement.setAttribute('id', tag.id);
      htmlLinkElement.setAttribute('rel', tag.rel);
      htmlLinkElement.setAttribute('href', tag.href);
      this.document.head.appendChild(htmlLinkElement);
    }

    return htmlLinkElement;
  }

  /**
   * Update the "lang" attribute on the html document tag
   */
  setHtmlLang(languageIsoCode: LanguageObject['iso']): void {
    if (!this.applicationIsEmbedded && this.document) {
      const formattedLanguageIsoCode = languageIsoCode.replace('_', '-');
      this.document.documentElement.setAttribute('lang', formattedLanguageIsoCode);
    }
  }
}
