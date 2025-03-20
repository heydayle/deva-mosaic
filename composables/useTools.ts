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

interface SimpleImage {
    id: string;
    src: string | null;
    alt: string;
    name: string;
  }
export const useTools = () => {
    function convertNotionPagesToImageList(notionPages: NotionPage[]): SimpleImage[] {
        
        return notionPages.map((page: any) => {
          const result: SimpleImage = {
            id: page.id,
            src: null,
            alt: "",
            name: ""
          };
          
          const fileProperty = page.properties.file;
          if (fileProperty && fileProperty.type === "files" && fileProperty.files.length > 0) {
            const file = fileProperty.files[0];
            
            if (file.type === "file" && file.file && file.file.url) {
              result.src = file.file.url;
            } else if (file.type === "external" && file.external && file.external.url) {
              result.src = file.external.url;
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
        convertNotionPagesToImageList
      }
}