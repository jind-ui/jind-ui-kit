import { FileUploader } from 'jind-ui-kit';
import { Preview } from '../components/Preview';
import { PropsTable } from '../components/PropsTable';
import { ViewMarkdown } from '../components/ViewMarkdown';

const props = [
  { name: 'accept', type: 'string', description: 'Accepted file types (e.g. "image/*,.pdf")' },
  { name: 'multiple', type: 'boolean', description: 'Allow multiple files (default: true)' },
  { name: 'maxSize', type: 'number', description: 'Max file size in bytes' },
  { name: 'maxFiles', type: 'number', description: 'Max number of files' },
  { name: 'disabled', type: 'boolean', description: 'Disable the uploader' },
  { name: 'onFilesSelected', type: '(files: File[]) => void', description: 'Callback when files are selected' },
  { name: 'onFileRemove', type: '(id: string) => void', description: 'Callback when a file is removed' },
  { name: 'files', type: 'FileItem[]', description: 'Controlled file list (file, id, progress?, error?)' },
  { name: 'label', type: 'string', description: 'Drop zone label text' },
  { name: 'hint', type: 'string', description: 'Helper text below the label' },
];

export function ComponentFileUploader() {
  return (
    <div className="page-container">
      <div className="page-header">
        <ViewMarkdown slug="file-uploader" />
        <h1 className="page-title">FileUploader</h1>
        <p className="page-description">
          Drag-and-drop file upload zone with file list, progress indicators,
          and size validation. Click or drop files to upload.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Basic</h2>
        <Preview
          align="column"
          code={`<FileUploader
  hint="PNG, JPG up to 10MB"
  onFilesSelected={(files) => console.log(files)}
/>`}
        >
          <div style={{ width: '100%' }}>
            <FileUploader
              hint="PNG, JPG up to 10MB"
              onFilesSelected={(files) => console.log('Selected:', files)}
            />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">With Constraints</h2>
        <Preview
          align="column"
          code={`<FileUploader
  accept="image/*"
  maxFiles={3}
  maxSize={5 * 1024 * 1024}
  label="Upload images (max 3)"
  hint="Images only, 5MB each"
/>`}
        >
          <div style={{ width: '100%' }}>
            <FileUploader
              accept="image/*"
              maxFiles={3}
              maxSize={5 * 1024 * 1024}
              label="Upload images (max 3)"
              hint="Images only, 5MB each"
            />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Disabled</h2>
        <Preview
          align="column"
          code={`<FileUploader disabled label="Uploads paused" />`}
        >
          <div style={{ width: '100%' }}>
            <FileUploader disabled label="Uploads paused" />
          </div>
        </Preview>
      </div>

      <div className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={props} />
      </div>
    </div>
  );
}
