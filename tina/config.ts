import { defineConfig, Form, TinaCMS } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "public/images",
      publicFolder: "/"
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog",
        format: 'md',
        defaultItem: () => {
          return {
            author: {
              profileImage: '/public/images/default.png',
              name: 'Thatchakon Jom-ud'
            },
            featured: false
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description'
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true
          },
          {
            type: 'image',
            name: 'coverImage',
            label: 'Cover Image',
            ui: {
              
            }
          },
          {
            type: 'boolean',
            name: 'featured',
            label: 'Featured Post'
          },
          {
            type: 'datetime',
            name: 'createdDate',
            label: 'Created Date'
          },
          {
            type: 'object',
            name: 'author',
            label: 'Author',
            fields: [
              {
                type: 'image',
                name: 'profileImage',
                label: 'Profile Image'
              },
              {
                type: 'string',
                name: 'name',
                label: 'Name'
              }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          filename: {
            slugify: () => 'index',
            readonly: true
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form
            cms: TinaCMS
            values: Record<string, any>
          }) => {
            let description = ''
            if (values.body.children.length > 0) {
              const firstParagraph = values.body.children[0].children[0].text
              description = firstParagraph
            }
            if (form.crudType === 'create') {
              return {
                ...values,
                description,
                createdDate: new Date().toISOString()
              }
            }
            return {
              ...values,
              description
            }
          }
        }
      },
    ],
  },
});
