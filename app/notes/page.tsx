'use server'
import { createSupabaseClient } from '../../lib/supabaseClient';

export default async function Notes() {
  const supabase = createSupabaseClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) {
    return <pre>Error: {error.message}</pre>
  }

  if (!notes || notes.length === 0) {
    return <p>Tidak ada data.</p>
  }

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note: any) => (
          <tr key={note.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{note.id}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{note.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}