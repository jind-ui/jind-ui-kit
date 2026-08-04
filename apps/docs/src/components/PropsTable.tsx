interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="props-table-wrapper" style={{ overflowX: 'auto' }}>
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td><span className="prop-name">{p.name}</span></td>
              <td><span className="prop-type">{p.type}</span></td>
              <td><span className="prop-default">{p.default ?? '—'}</span></td>
              <td style={{ color: '#5d676f' }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
