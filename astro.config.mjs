import { defineConfig, sharpImageService } from "astro/config";
import NetlifyCMS from "@jee-r/astro-decap-cms";

// import { de } from 'netlify-cms-locales';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://decapcms.org/docs/beta-features/#folder-collections-media-and-public-folder
// import netlify from "@astrojs/netlify";
// import node from "@astrojs/node";
// import { loadEnv } from "vite";
// const { BASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://astro.build/config
export default defineConfig({
  site: "https://p.roocker.dev/ae30/",
  // base: BASE_URL,
  // base: "/ae30",
  // output: "hybrid",
  // adapter: netlify({ edgeMiddleware: true }),
  /* adapter: node({
    mode: "standalone",
  }), */
  image: {
    service: sharpImageService(),
  },
  integrations: [
    // SETTINGS -----------------------------------------------
    NetlifyCMS({
      config: {
        backend: {
          name: "git-gateway",
          branch: "master",
        },
        adminPath: "/a",
        /* #rev geht nicht */
        locale: "de",
        publish_mode: "editorial_workflow",
        media_folder: "/src/content/media/",
        public_folder: "../media",
        slug: {
          /* sanitizes filenames and media */
          encoding: "ascii",
          clean_accents: true,
          sanitize_replacement: "_",
        },
        site_url: "https://ae30-test.netlify.app",
        display_url: "https://ae30-test.netlify.app",
        logo_url: "/ae30-logo.svg",
        /* #rev looks good doen't work */
        load_config_file: false,
        show_preview_links: false,
        disableIdentityWidgetInjection: true,
        // https://github.com/decaporg/decap-cms/blob/master/dev-test/config.yml
        // https://cms-demo.netlify.com/#/collections/settings

        // COLLECTIONS  -----------------------------------------------
        collections: [
          // PROJECTS  -----------------------------------------------

          {
            name: "projects",
            label: "Projekte",
            description: "Projekte anlegen, löschen und verwalten",
            folder: "src/content/projects",
            create: true,
            delete: true,
            path: "{{slug}}/index",
            media_folder: "",
            public_folder: "../{{slug}}",
            fields: [
              {
                name: "title",
                label: "Kurz Titel",
                widget: "string",
                hint: "Projekt Kurzbezeichnung; genutzt für URL zb.:tuw ba => (ae30.at/arge/tuw_ba)",
              },
              {
                name: "title_l",
                label: "Projekt Titel",
                widget: "string",
                hint: "Dieser Title wird bei Textdarstellungen und im Plankopf genutzt",
              },
              {
                name: "display",
                label: "Darstellung (optional)",
                hint: "Optionale Darstellungs Präferenzen",
                widget: "object",
                collapsed: true,
                fields: [
                  {
                    name: "title_zzl",
                    label: "Zusatz Projekt Titel",
                    widget: "string",
                    required: false,
                    hint: "optional, Zusatztitel zb.: Science Center / Halle 227",
                  },
                  {
                    name: "archived",
                    widget: "boolean",
                    label: "Archiviern (ein = archiviert!)",
                    required: false,
                    hint: "Projekt erscheint nicht in der Gallerie, ist aber über URL aufrufbar (ae30.at/categorie/projekt) (ae30.at/arge/ba) & ae30.at/archiv ",
                  },
                  {
                    name: "publishDate",
                    widget: "datetime",
                    format: "DD MMM YYYY",
                    date_format: "DD MMM YYYY",
                    time_format: false,
                    label: "Veröffentlichkeits Datum",
                  },
                  {
                    name: "widehigh",
                    widget: "select",
                    label: "Größe Startseite",
                    options: ["normal", "extra breit", "extra hoch"],
                    required: false,
                    hint: "",
                  },
                  /* {
          name: 'share',
          widget: 'boolean',
          label: 'Teilen Option anzeigen ',
          required: false,
          hint: 'Teilen Option im Projekt anzeigen ein-/ausschalten',
          }, */
                ],
              },
              {
                name: "category",
                /* eigene collection! dynamisch aus cat*/
                label: "Kategorie",
                widget: "relation",
                collection: "categories",
                search_fields: ["title"],
                value_field: "short",
                display_fields: ["title"],
                default: "ARGE",
                /* options: [
          {
          label: 'ARGE',
          value: 'arge'
          },
          {
          label: 'Kratochwil Gerhard',
          value: 'kg'
          },
          {
          label: 'Waldbauer Peter',
          value: 'wp'
          },
          {
          label: 'Zeinitzer Klaus',
          value: 'zk'
          },
          ] */
              },
              {
                name: "project_keys",
                label: "Projekt Kennwerte",
                widget: "object",
                collapsed: true,
                hint: "Projekt Kennwerte. Diese werden genutzt um die Projekte entsprechend auf der Startseite zu filtern. Diese entsprechen auch dem standard Block der Projekt/Textbeschreibung",
                fields: [
                  {
                    name: "status",
                    label: "status",
                    widget: "string",
                    required: false,
                    hint: "optional; zb: abgeschlossen, in Planung, in Ausführung, o.ä. ...",
                  },
                  {
                    name: "year",
                    label: "Jahr",
                    widget: "number",
                    pattern: [
                      "^.{4}$",
                      "Muss eine 4-stellige Zahl sein (zb.: 2020)",
                    ],
                    hint: "Baubeginn/Planungsbeginn Jahr VON ",
                  },
                  {
                    name: "year2",
                    label: "Jahr2",
                    widget: "number",
                    pattern: [
                      "^.{4}$",
                      "Muss eine 4-stellige Zahl sein (zb.: 2020)",
                    ],
                    hint: "Baubeginn/Planungsbeginn Jahr VON ",
                  },
                  {
                    name: "area",
                    label: "Fläche",
                    widget: "number",
                    hint: "Fläche in m² gerundet",
                  },
                  {
                    name: "tags",
                    label: "Typologien",
                    widget: "select",
                    multiple: true,
                    min: 1,
                    max: 100,
                    hint: "mehrere auswählen möglich, mindestens eins",
                    options: [
                      "Öffentlich",
                      "Privat",
                      "Universität",
                      "Labor",
                      "Büro",
                      "Wohnbau",
                      "Außenraum",
                      "Ausstellungsraum",
                      "Geschäft/Shop",
                      "wohnen",
                      "lernen",
                      "arbeiten",
                    ],
                  },
                ],
              },
              {
                name: "titleimg",
                widget: "object",
                collapsed: true,
                label: "Titelbild",
                fields: [
                  {
                    name: "img",
                    widget: "image",
                    label: "Titelbild",
                  },
                  {
                    name: "alt",
                    widget: "string",
                    label: "Bildtitel = Alternativtext",
                    hint: "Bildtitel sind wichtig für Suchmaschinen & wenn das Bild nicht geladen werden kann!",
                  },
                  {
                    name: "source",
                    widget: "string",
                    required: false,
                    label: "Quelle",
                    hint: "Bildquellen Angabe falls vorhanden",
                  },
                  {
                    name: "source_url",
                    widget: "string",
                    required: false,
                    label: "Quelle URL",
                    hint: "Bildquellen URL Angabe falls vorhanden",
                    pattern: ["^https?://.*$", "URLs starten mit http"],
                  },
                ],
              },
              {
                name: "fotos",
                label: "Fotos",
                widget: "list",
                min: 1,
                max: 100,
                summary: "{{fields.alt}}",
                fields: [
                  {
                    name: "foto",
                    label: "Foto",
                    widget: "image",
                  },
                  {
                    name: "alt",
                    widget: "string",
                    label: "Bildtitel = Alternativtext",
                    hint: "Bildtitel sind wichtig für Suchmaschinen & wenn das Bild nicht geladen werden kann!",
                  },
                  {
                    name: "source",
                    widget: "string",
                    required: false,
                    label: "Quelle",
                    hint: "Bildquellen Angabe falls vorhanden",
                  },
                  {
                    name: "source_url",
                    widget: "string",
                    required: false,
                    label: "Quelle URL",
                    hint: "Bildquellen URL Angabe falls vorhanden",
                  },
                ],
              },
              {
                name: "plans",
                widget: "list",
                min: 1,
                max: 100,
                required: false,
                summary: "{{fields.alt}}",
                fields: [
                  {
                    name: "plan",
                    widget: "image",
                    label: "Plan",
                  },
                  {
                    name: "alt",
                    widget: "string",
                    label: "Plantitel = Alternativtext",
                    hint: "Bild/Plantitel sind wichtig für Suchmaschinen & wenn das Bild nicht geladen werden kann!",
                  },
                  {
                    name: "source",
                    widget: "string",
                    required: false,
                    label: "Quelle",
                    hint: "Bildquellen Angabe falls vorhanden",
                  },
                  {
                    name: "source_url",
                    widget: "string",
                    required: false,
                    label: "Quelle URL",
                    hint: "Bildquellen URL Angabe falls vorhanden",
                  },
                ],
              },
              /* {
        name: 'short',
        widget: 'markdown',
        label: 'Kurztext',
        hint: 'Kurztext Version, maximal X zeichen', //#rev
        required: false,
        }, */
              /* {
        widget: "object",
        name: "descriptions",
        label: "Texte",
        collapsed: true,
        fields: [ */
              {
                name: "description",
                label: "Kurzbeschreibung",
                hint: "Zwischen 10 und maximal 160 Zeichen. Die Anzahl ist optimiert auf Suchmaschinen. Diese 160 Zeichen sollten möglichst alle wichtigen Projekteigentschaften enthalten.",
                widget: "text",
                required: true,
                pattern: [
                  "^.{10,160}$",
                  "Zwischen 10 und maximal 160 Zeichen. Die Anzahl ist optimiert auf Suchmaschinen. Diese 160 Zeichen sollten möglichst alle wichtigen Projekteigentschaften enthalten.",
                ],
              },
              {
                name: "body",
                label: "Langtext",
                widget: "markdown",
                required: true,
                pattern: [".{10,}", "Mindestens 10 Zeichen."],
              },
            ],
          },
          /* {
          name: 'map',
          widget: 'map',
          label: 'Karte',
          required: false
        } */
          /* ],
      }, */

          // PAGES  -----------------------------------------------
          {
            name: "pages",
            label: "Seiten",
            description: "Seiten wie Über uns, Kontakt, Impressum",
            create: true,
            delete: true,
            folder: "src/content/pages",
            fields: [
              {
                name: "title",
                label: "Titel",
                widget: "string",
              },
              {
                name: "cover",
                label: "Titel Bild",
                widget: "image",
              },
              {
                name: "body",
                label: "Inhalt",
                widget: "markdown",
              },
            ],
          },
          // TEAM -----------------------------------------------
          {
            name: "team",
            label: "Team",
            description: "Team Seite",
            create: false,
            delete: false,
            files: [
              {
                name: "team",
                label: "Team",
                delete: false,
                file: "src/content/team/team.md",
                fields: [
                  {
                    name: "title",
                    label: "Titel",
                    widget: "string",
                  },
                  {
                    name: "teamfoto",
                    widget: "object",
                    label: "Team Foto",
                    fields: [
                      {
                        name: "img",
                        widget: "image",
                        label: "Team Foto",
                      },
                      {
                        name: "alt",
                        widget: "string",
                        label: "Teamfoto = Alternativtext",
                        hint: "Bildtitel sind wichtig für Suchmaschinen & wenn das Bild nicht geladen werden kann!",
                      },
                    ],
                  },
                  /* {
          name: "text",
          widget: "markdown",
          required: false,
          label: "Team Text 1",
          }, */
                  {
                    name: "heading_members_highlighted",
                    widget: "string",
                    label: "Überschrift Mitglieder Section (highlighted)",
                  },
                  {
                    name: "heading_members_active",
                    widget: "string",
                    label: "Überschrift Mitglieder Section (active)",
                  },
                  {
                    name: "heading_members_former",
                    widget: "string",
                    label: "Überschrift Mitglieder Section (former)",
                  },
                  {
                    name: "member",
                    label: "Team Mitglied",
                    widget: "list",
                    multiple: true,
                    fields: [
                      {
                        name: "name",
                        label: "Name",
                        widget: "string",
                        hint: "Titel Vorname Nachname, Titel 2",
                      },
                      {
                        name: "mode",
                        label: "Auswahl",
                        widget: "object",
                        fields: [
                          {
                            name: "highlighted",
                            label: "Hervorgehoben",
                            required: false,
                            widget: "boolean",
                          },
                          {
                            name: "former",
                            label: "Ehemalige/r Mitarbeiter/-in",
                            required: false,
                            widget: "boolean",
                          },
                          {
                            name: "archived",
                            label: "Ausgeblende/r Mitarbeiter/-in",
                            required: false,
                            widget: "boolean",
                          },
                        ],
                      },
                      {
                        name: "details",
                        label: "Details",
                        required: false,
                        widget: "list",
                        fields: [
                          {
                            name: "description",
                            label: "Detail Beschreibung",
                            required: false,
                            widget: "string",
                            hint: "optional zb.: Geburtstag, oder Position",
                          },
                          {
                            name: "detail",
                            label: "Detail",
                            widget: "string",
                            hint: "zb.: 01.01.1980, oder Projektleiter",
                          },
                        ],
                      },
                      {
                        name: "img",
                        widget: "image",
                        label: "Member Foto",
                        required: false,
                      },
                    ],
                  },
                  {
                    name: "body",
                    label: "Langtext",
                    widget: "markdown",
                  },
                ],
              },
            ],
          },
          // SETTINGS  -----------------------------------------------
          {
            name: "settings",
            label: "Einstellungen",
            description:
              "Allgmeine Website Einstellungen. NUR MIT VORSICHT ÄNDERN. ",
            comment: "NUR MIT VORSICHT ÄNDERN / EDIT ONLY WITH CARE",
            editor: {
              preview: false,
            },
            files: [
              {
                name: "settings",
                label: "Website Einstellungen",
                file: "src/content/settings/settings.md",
                fields: [
                  {
                    name: "title",
                    label: "Website Titel",
                    widget: "string",
                    hint: "zb AE30 - Atelier Eroicagasse",
                  },
                  {
                    name: "description",
                    label: "Seitenbeschreibung",
                    widget: "text",
                    hint: "Sollte exakt zwischen 150 und 160 Zeichen lang sein (SEO)",
                  },
                  {
                    name: "title_alt",
                    label: "Alternativ Titel",
                    widget: "string",
                  },
                  {
                    name: "contact",
                    label: "Kontakt Informationen",
                    widget: "object",
                    collapsed: true,
                    fields: [
                      {
                        name: "address1",
                        label: "Adresse Zeile 1",
                        widget: "string",
                      },
                      {
                        name: "address2",
                        label: "Adresse Zeile 2",
                        widget: "string",
                      },
                      {
                        name: "address3",
                        label: "Adresse Zeile 3",
                        widget: "string",
                      },
                      {
                        name: "mail",
                        label: "Mail Adresse",
                        widget: "string",
                      },
                      {
                        name: "tel",
                        label: "Telefon Nummer",
                        widget: "string",
                      },
                      {
                        name: "fax",
                        label: "Fax Nummer",
                        widget: "string",
                      },
                      {
                        name: "uid",
                        label: "UID",
                        widget: "string",
                      },
                    ],
                  },
                  {
                    name: "main_menu",
                    label: "Hauptmenü",
                    widget: "object",
                    collapsed: true,
                    fields: [
                      {
                        name: "menu_cats",
                        label: "Hauptmenü Kategorien",
                        widget: "list",
                        fields: [
                          {
                            name: "menu_item_cat",
                            label: "Hauptmenü Kategories Link",
                            widget: "relation",
                            collection: "categories",
                            // multiple: true,
                            value_field: "short",
                            search_fields: ["title"],
                            display_fields: ["title"],
                          },
                          {
                            name: "menue_item_cat_name",
                            label: "Hauptmenü Kategorie Name",
                            widget: "string",
                          },
                        ],
                      },
                      {
                        name: "menu_pages",
                        label: "Hauptmenü Pages",
                        widget: "list",
                        fields: [
                          {
                            name: "menu_item_pages",
                            label: "Pages",
                            widget: "relation",
                            collection: "pages",
                            search_fields: ["title"],
                            value_field: "{{slug}}",
                            display_fields: ["title"],
                          },
                          {
                            name: "menue_item_pages_name",
                            label: "Hauptmenü Pages Name",
                            widget: "string",
                          },
                        ],
                      },
                      {
                        name: "menu_projects",
                        label: "Hauptmenü Projekte",
                        widget: "list",
                        fields: [
                          {
                            name: "menu_item_projects",
                            label: "Hauptmenü Projekte",
                            widget: "relation",
                            // multiple: true,
                            collection: "projects",
                            search_fields: ["title"],
                            value_field: "{{slug}}",
                            display_fields: ["title"],
                            options_length: 200,
                          },
                          {
                            name: "menue_item_projects_name",
                            label: "Hauptmenü Projekte Name",
                            widget: "string",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "filter",
                    label: "Galerie Filter an/ausschalten",
                    widget: "object",
                    collapsed: true,
                    hint: "Filter Optionen für die Startseite an/ausschalten",
                    fields: [
                      {
                        name: "cat",
                        label: "Kategorie",
                        widget: "boolean",
                        hint: "Kategorie Filter = ARGE/Kratochwil/Waldbauer/Zeinitzer/",
                      },
                      {
                        name: "tag",
                        label: "Typologie Filter",
                        widget: "boolean",
                        hint: "Typologie Filter = öffentlich, privat, ...",
                      },
                      {
                        name: "year",
                        label: "Jahres Filter",
                        widget: "boolean",
                        hint: "Jahres Filter = Filter nach Jahreszahlen",
                      },
                      {
                        name: "size",
                        label: "Größe Filter",
                        widget: "boolean",
                        hint: "Größe Filter = Filter nach Objektgröße",
                      },
                    ],
                  },
                ],
              },
              {
                name: "sorter",
                label: "Gallerie Priorität Reihenfolge",
                file: "src/content/settings/sort.md",
                fields: [
                  {
                    name: "sorter-title",
                    label: "title",
                    widget: "string",
                    hint: "Gelistete Projekte werden nach Reihenfolge vorgereiht, alle anderen werden nach Erstellungs - Datum sortiert",
                  },
                  {
                    name: "PrioList",
                    label: "Prioritäten Liste",
                    widget: "list",
                    fields: [
                      {
                        name: "relation-proj",
                        label: "relation-proj",
                        widget: "relation",
                        collection: "projects",
                        search_fields: ["title"],
                        value_field: "{{slug}}",
                        display_fields: ["{{slug}} - Titel:  {{title}}"],
                        options_length: 2000,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // CATEGORIES  -----------------------------------------------
          {
            name: "categories",
            label: "Haupt-Kategorien",
            description:
              "Haupt Kategorien Erstellen. Achtung! Kategorien sollten nicht gelöscht werden (benötigt anpassen aller Projekte an Änderungen). Zum Anpassen fehlerhafter Projekte nach Änderungen einfach noch einmal die (geänderte bzw. neue) Kategorie in den jeweiligen Projekten auswählen und speichern!",
            folder: "src/content/categories",
            create: true,
            delete: false,
            editor: {
              preview: false,
            },
            fields: [
              {
                name: "title",
                widget: "string",
                label: "Kategorie Name",
                hint: "Ganzer Name (Groß-/Kleinschreibung) zb.: Kratochwil Gerhard (erstes Wort wird für Kategorien Bezeichnung genutzt)",
              },
              {
                name: "short",
                label: "Kurzname",
                widget: "string",
                hint: "Kurzname (Kleinschreibung!) zb.: kg; wird für url genutzt",
              },
              {
                name: "description",
                widget: "string",
                label: "Beschreibung",
              },
            ],
          },
        ],
        //collection ENDE
        previewStyles: ["/src/styles/preview.css"],
      },
      // previewStyles: ["/src/styles/preview.css"],
    }),
    mdx(),
    sitemap(),
    react(),
  ],
});
