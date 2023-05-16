/* 
TODO
- [ ]  Collection: rename titleimg.alt titleimg.uberschrift? Titlebild Überschrift
- [ ]  Collection: rename fotos.foto img und uberschrift analog title.img

  */
import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';
// import { de } from 'netlify-cms-locales';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from "@astrojs/image";
import react from "@astrojs/react";

// CMS.registerLocale('de', de);
// https://astro.build/config
export default defineConfig({
  site: 'https://ae30.at',
  integrations: [NetlifyCMS({
    config: {
      backend: {
        name: 'git-gateway',
        branch: 'master'
      },
      adminPath: '/a',
      /* #rev geht nicht */
      locale: 'de',
      publish_mode: 'editorial_workflow',
      media_folder: '/public/media',
      public_folder: '/media',
      /* hier dann der ordner wo die optimierten bilder sind */
      // media_library: {registerMediaLibrary: 'cloudinary', name: 'cloudinary', config: {cloud_name:'dcat', api_key: '498668484182745', multiple:true},
      cat: {
        /* sanitizes filenames and media */
        encoding: "ascii",
        clean_accents: true,
        sanitize_replacement: "_"
      },
      site_url: 'https://ae30-test.netlify.app',
      display_url: 'https://ae30-test.netlify.app',
      logo_url: '/ae30-logo.svg',
      /* #rev looks good doen't work */
      show_preview_links: true,
      disableIdentityWidgetInjection: true,
      // COLLECTION
      collections: [{
        name: 'settings',
        label: 'Einstellungen',
        description: 'Allgmeine Website Einstellungen. NUR MIT VORSICHT ÄNDERN',
        comment: 'NUR MIT VORSICHT ÄNDERN / EDIT ONLY WITH CARE',
        // folder: 'content/settings/',
        create: false,
        delete: false,
        editor: {
          preview: false
        },
        folder: 'src/content/settings/',
        // #rev müsste geschachtelt sein und dann nur file: '/content/settings/set.yml',
        // https://github.com/decaporg/decap-cms/blob/master/dev-test/config.yml 
        //https://cms-demo.netlify.com/#/collections/settings
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'HAUPT TITEL',
          comment: 'NUR MIT SORGFALT ÄNDERN! (weißt du was du tust?)'
        }, {
          name: 'description',
          widget: 'string',
          label: 'Seitenbeschreibung'
        }, {
          name: 'Hauptmenu',
          widget: 'string',
          label: 'Haupt Menü'
        }, {
          name: 'max_project_count',
          widget: 'string',
          label: 'Anzahl Projekte Galerie (Frontpage)'
        }, {
          name: 'Links',
          widget: 'string',
          label: 'Links'
        }, {
          name: 'theme',
          widget: 'boolean',
          label: 'Theme - Hell / Dunkel',
          required: false
        }]
      }, {
        name: 'categories',
        label: 'Haupt-Kategorien',
        description: 'Haupt Kategorien Erstellen. Achtung! Kategorien können nicht gelöscht werden (benötigt anpassen aller Projekte an Änderungen)',
        folder: 'src/content/cat',
        create: true,
        delete: false,
        editor: {
          preview: false
        },
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Kategorie Name'
        }, {
          name: 'short',
          widget: 'string',
          label: 'Kurzname'
        }, {
          name: 'url',
          widget: 'string',
          label: 'Kategorie URL'
        }, {
          name: 'description',
          widget: 'string',
          label: 'Beschreibung'
        }]
      }, {
        name: 'subcategories',
        label: 'Unter-Kategorien',
        description: 'Unter Kategorien',
        folder: 'src/content/cat/sub',
        create: true,
        delete: false,
        editor: {
          preview: false
        },
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Unter-Kategorie Name'
        }, {
          name: 'url',
          widget: 'string',
          label: 'Unter-Kategorie URL'
        }, {
          name: 'main category',
          widget: 'string',
          label: 'Eltern Kategorie'
        }, /* #rev select from category*/
        {
          name: 'description',
          widget: 'string',
          label: 'Beschreibung'
        }]
      }, {
        name: 'projects',
        label: 'Projekte',
        description: 'Projekte anlegen, löschen und verwalten',
        folder: 'src/content/projects',
        create: true,
        delete: true,
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Projekt Titel'
        },
        // { name: 'archived', widget: 'boolean', label: 'Archiviern (ein = archiviert! Projekt erscheint nur mehr im Archiv #rev URL)', required: false },
        {
          name: 'publishDate',
          widget: 'datetime',
          format: 'DD MMM YYYY',
          date_format: 'DD MMM YYYY',
          time_format: false,
          label: 'Veröffentlichkeits Datum'
        }, {
          name: 'category',
          /* eigene collection! dynamisch aus cat*/
          widget: 'select',
          label: 'Kategorie',
          default: 'ARGE',
          options: [{
            label: 'ARGE',
            value: 'arge'
          }, {
            label: 'Kratochwil Gerhard',
            value: 'kg'
          }, {
            label: 'Waldbauer Peter',
            value: 'wp'
          }, {
            label: 'Zeinitzer Klaus',
            value: 'zk'
          }]
        }, {
          name: 'subcategory',
          widget: 'string',
          label: 'Subkategorie'
        }, {
          name: 'titleimg',
          widget: 'object',
          label: 'Titelbild',
          fields: [{
            name: 'img',
            widget: 'image',
            label: 'Titelbild'
          }, {
            name: 'alt',
            widget: 'string',
            label: 'Alternativ Text',
            hint: 'Bildtitel sind wichtig für Suchmaschinen & wenn das Bild nicht geladen werden kann!'
          }]
        },
        // { name: 'bodyphotos', widget: 'markdown', label: 'bodyPhotos', required: false},
        // { name: 'photos', widget: 'image', label: 'Photos', media_library: {config: {multiple: true}}, required: false},
        // { name: 'plans', widget: 'file', label: 'Pläne', required: false, allow_multiple: true, },
        {
          name: 'fotos',
          widget: 'list',
          required: false,
          fields: [{
            name: 'foto',
            widget: 'image',
            label: 'Foto',
            required: false
          }, {
            name: 'alt',
            widget: 'string',
            label: 'Alternativ Text',
            hint: 'Bildtitel sind wichtig für Suchmaschinen & wenn das Bild nicht geladen werden kann!'
          }]
        }, {
          name: 'short',
          widget: 'markdown',
          label: 'Kurztext',
          required: false
        }, {
          name: 'long',
          widget: 'markdown',
          label: 'Langtext'
        }, {
          name: 'map',
          widget: 'map',
          label: 'Karte',
          required: false
        }]
      }]
    },
    previewStyles: ['/src/styles/preview.css']
  }), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), mdx(), sitemap(), react()]
});
