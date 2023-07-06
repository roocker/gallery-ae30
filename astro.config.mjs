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
  integrations: [
// SETTINGS -----------------------------------------------
    NetlifyCMS({
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
        
          // https://github.com/decaporg/decap-cms/blob/master/dev-test/config.yml 
          //https://cms-demo.netlify.com/#/collections/settings
        //
// COLLECTIONS  -----------------------------------------------
      collections: [

// SETTINGS  -----------------------------------------------
        {
          name: 'settings',
          label: 'Einstellungen',
          description: 'Allgmeine Website Einstellungen. NUR MIT VORSICHT ÄNDERN',
          comment: 'NUR MIT VORSICHT ÄNDERN / EDIT ONLY WITH CARE',
          create: false,
          delete: false,
          folder: 'src/content/settings/',
          editor: { preview: false },
          fields: [
            /* {
              name: 'title',
              label: 'Einstellungen Titel',
              comment: 'NUR MIT SORGFALT ÄNDERN!',
              default: 'SETTINGS',
            }, */
            {
              name: 'site-title',
              label: 'Website Titel',
              widget: 'string',
              hint: "zb AE30 - Atelier Eroicagasse",
            },
            {
              name: 'description',
              label: 'Seitenbeschreibung',
              widget: 'string',
            },
            {
              name: 'main_menu',
              label: 'Hauptmenü',
              widget: 'object',
              fields: [
                {
                  name: 'menu_cats',
                  label: 'Hauptmenü Kategorien',
                  widget: 'list',
                  fields: [ 
                    {
                      name: 'menu_item_cat',
                      label: 'Hauptmenü Kategories Link',
                      widget: 'relation',
                      collection: 'categories',
                      // multiple: true,
                      search_fields:["title"],
                      value_field: "short",
                      display_fields:["title"]
                    },
                    {
                      name: 'menue_item_cat_name',
                      label: 'Hauptmenü Kategorie Name',
                      widget: 'string'
                    }
                  ]
                },
                {
                  name: 'menu_pages',
                  label: 'Hauptmenü Pages',
                  widget: 'list',
                  fields: [ 
                    {
                      name: 'menu_item_pages',
                      label: 'Pages',
                      widget: 'relation',
                      collection: 'pages',
                      // multiple: true,
                      search_fields:["title"],
                      value_field: "{{slug}}",
                      display_fields:["title"]
                    },
                    {
                      name: 'menue_item_pages_name',
                      label: 'Hauptmenü Pages Name',
                      widget: 'string'
                    },
                  ]
                },
                {
                  name: 'menu_projects',
                  label: 'Hauptmenü Projekte',
                  widget: 'list',
                  fields: [ 
                    {
                      name: 'menu_item_projects',
                      label: 'Hauptmenü Projekte',
                      widget: 'relation',
                      collection: 'projects',
                      // multiple: true,
                      search_fields:["title"],
                      value_field: "{{slug}}",
                      display_fields:["title"]
                    },
                    {
                      name: 'menue_item_projects_name',
                      label: 'Hauptmenü Projekte Name',
                      widget: 'string'
                    },
                  ]
                }
              ]
            },
            {
              name: 'index_amount',
              label: 'Anzahl Projekte Startseite',
              widget: 'number',
            },
          ]
        },

// PAGES  -----------------------------------------------
        {
          name: 'pages',
          label: 'Seiten',
          description: 'Seiten wie Über uns, Kontakt, Impressum',
          folder: 'src/content/pages',
          create: true,
          delete: true,
          fields: [
            {
              name: 'title',
              label: 'Titel',
              widget: 'string',
            },
            {
              name: 'template',
              label: 'Design Template',
              widget: 'select',
              multiple: false,
              options: ["team", "about", "impressum", "sonstiges"],
            },
            {
              name: 'content',
              label: 'Inhalt',
              widget: 'markdown',
            }
          ]
        },

// CATEGORIES  -----------------------------------------------
        {
          name: 'categories',
          label: 'Haupt-Kategorien',
          description: 'Haupt Kategorien Erstellen. Achtung! Kategorien können nicht gelöscht werden (benötigt anpassen aller Projekte an Änderungen)',
          folder: 'src/content/cat',
          create: true,
          delete: false,
          editor: {
            preview: false
          },
          fields: [
            {
              name: 'title',
              widget: 'string',
              label: 'Kategorie Name'
            },
            {
              name: 'short',
              widget: 'string',
              label: 'Kurzname'
            },
            {
              name: 'url',
              widget: 'string',
              label: 'Kategorie URL'
            },
            {
              name: 'description',
              widget: 'string',
              label: 'Beschreibung'
            }
          ]
        },



// PROJECTS  -----------------------------------------------

        {
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
        },
        {
          name: 'plans',
          widget: 'list',
          required: false,
          fields: [{
            name: 'plan',
            widget: 'image',
            label: 'Plan',
            required: false
          }, {
            name: 'alt',
            widget: 'string',
            label: 'Alternativ Text',
            hint: 'Bild/Plantitel sind wichtig für Suchmaschinen & wenn das Bild nicht geladen werden kann!'
          }]
        },
          {
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
      }




      ] //collection ENDE




    },
    previewStyles: ['/src/styles/preview.css']
  }), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), mdx(), sitemap(), react()]
});
