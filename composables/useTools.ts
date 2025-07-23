interface NotionUser {
  object: "user";
  id: string;
}

interface DatabaseParent {
  type: "database_id";
  database_id: string;
}

interface NumberProperty {
  id: string;
  type: "number";
  number: number | null;
}

interface FilesProperty {
  id: string;
  type: "files";
  files: Array<any>; // Can be expanded if needed with specific file structure
}

interface TitleProperty {
  id: string;
  type: "title";
  title: Array<any>; // Can be expanded if title items have specific structure
}

interface NotionPageProperties {
  Number: NumberProperty;
  file: FilesProperty;
  Name: TitleProperty;
  [key: string]: any; // For any additional properties
}

interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  cover: null | any; // Can be expanded if needed
  icon: null | any; // Can be expanded if needed
  parent: DatabaseParent;
  archived: boolean;
  in_trash: boolean;
  properties: NotionPageProperties;
  url: string;
  public_url: string;
}

export interface SimpleImage {
    id: string
    src: string
    alt: string
    name: string
    fileId: string
    preview: string
    srcLoading: string
    img: string
    url: string
    height?: number
  }
export const useTools = () => {
  const convertFileIdEncodeURL = (url: string) => {
    const parsedUrl = new URL(url);
    const extractedPath = parsedUrl.pathname.split('/').slice(2).join(':')
    return encodeURIComponent('attachment:' + extractedPath)
  }
  const getImageLink = (fileId: string, blockId: string, width: number = 500, format: string = 'webp'): string => {
    return `https://www.notion.so/image/${fileId}?table=block&id=${blockId}&format=${format}&width=${width}`
  }
  const getImageHeight = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img.height);
    img.onerror = () => reject('Không tải được ảnh');
  });
}
  function convertNotionPagesToImageList(notionPages: NotionPage[]): SimpleImage[] {
      return notionPages.map((page: NotionPage, index: number) => {
        const result: SimpleImage = {
          id: page.id,
          src: "",
          alt: "",
          name: "",
          fileId: "",
          preview: "",
          srcLoading: "",
          img: "",
          url: "",
          // height: 800,
        };

        const fileProperty = page.properties.file;
        if (fileProperty && fileProperty.type === "files" && fileProperty.files.length > 0) {
          const file = fileProperty.files[0];

          if (file.type === "file" && file.file && file.file.url) {
            const fileId = convertFileIdEncodeURL(file.file.url);
            result.srcLoading = getImageLink(fileId, page.id, 1)
            result.src = getImageLink(fileId, page.id, 240)
            result.preview = getImageLink(fileId, page.id, 4000)
            result.fileId = fileId
            result.img = getImageLink(fileId, page.id, 128)
            result.url = `?index=${index - 1}`
          } else if (file.type === "external" && file.external && file.external.url) {

            result.src = file.external.url ? file.external.url.replace('https://prod-files-secure.s3.us-west-2.amazonaws.com', '') : ''
          }

          if (file.name) {
            result.name = file.name;
            result.alt = file.name; // Use filename as alt text
          }
        }

        const nameProperty = page.properties.Name;
        if (nameProperty && nameProperty.type === "title" && nameProperty.title.length > 0) {
          const titleText = nameProperty.title.map((t: { plain_text: string }) => t.plain_text).join("");
          if (titleText) {
            result.name = titleText;
            result.alt = titleText;
          }
        }

        return result;
      });
    }

      return {
        getImageHeight,
        getImageLink,
        convertNotionPagesToImageList
      }
}
