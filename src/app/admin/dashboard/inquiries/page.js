"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from '@/components/layout/AdminLayout';
import Taskbar from '@/components/shared/Taskbar';

const columns = [
  "Inquiry ID",
  "Date of Inquiry",
  "Mode of Inquiry",
  "RSTL Personnel in Contact",
  "Type of Inquiry",
  "Name of Customer",
  "Contact Details",
  "Details of Inquiry",
  "Lab Concerned",
  "Action from Lab",
  "Schedule",
  "Remarks from Lab and/or CRO",
  "Action from CRO",
  "To wait response until",
  "Status",
  "Action Logs (automatically updated from Column L)"
];

export default function InquiriesSheetPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState({}); // { rowIdx: { col: value } }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/dashboard/inquiries');
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Helper to map API data to table columns
  const renderCell = (row, col) => {
    switch (col) {
      case "Inquiry ID": return row.inquiry_id;
      case "Date of Inquiry": return row.date_of_inquiry ? new Date(row.date_of_inquiry).toLocaleString() : '';
      case "Mode of Inquiry": return row.mode_of_inquiry;
      case "RSTL Personnel in Contact": return row.rstl_personnel;
      case "Type of Inquiry": return row.type_of_inquiry;
      case "Name of Customer": return row.customer_name;
      case "Contact Details": return [row.email, row.contact_number].filter(Boolean).join(' / ');
      case "Details of Inquiry": return [row.sample_description, row.name_of_samples, row.sample_quantity, row.number_of_replicates].filter(Boolean).join(' | ');
      case "Lab Concerned": return row.laboratory;
      case "Action from Lab": return row.action_from_lab;
      case "Schedule": return row.schedule ? new Date(row.schedule).toLocaleString() : '';
      case "Remarks from Lab and/or CRO": return row.remarks;
      case "Action from CRO": return row.action_from_cro;
      case "To wait response until": return row.wait_response_until ? new Date(row.wait_response_until).toLocaleDateString() : '';
      case "Status": return row.status;
      case "Action Logs (automatically updated from Column L)": return row.action_logs;
      default: return '';
    }
  };

  // Helper to update cell value in local state
  const handleCellChange = (rowIdx, col, value) => {
    setEditing(prev => ({
      ...prev,
      [rowIdx]: { ...prev[rowIdx], [col]: value }
    }));
  };

  // Save cell value (update local data and clear editing state)
  const handleCellSave = (rowIdx, col) => {
    const value = editing[rowIdx]?.[col] || '';
    setData(prev => prev.map((row, idx) => {
      if (idx !== rowIdx) return row;
      // Map column to field name
      const newRow = { ...row };
      switch (col) {
        case "Mode of Inquiry": newRow.mode_of_inquiry = value; break;
        case "RSTL Personnel in Contact": newRow.rstl_personnel = value; break;
        case "Type of Inquiry": newRow.type_of_inquiry = value; break;
        case "Name of Customer": newRow.customer_name = value; break;
        case "Contact Details": newRow.contact_number = value; break; // or email
        case "Details of Inquiry": newRow.sample_description = value; break;
        case "Lab Concerned": newRow.laboratory = value; break;
        case "Action from Lab": newRow.action_from_lab = value; break;
        case "Schedule": newRow.schedule = value; break;
        case "Remarks from Lab and/or CRO": newRow.remarks = value; break;
        case "Action from CRO": newRow.action_from_cro = value; break;
        case "To wait response until": newRow.wait_response_until = value; break;
        case "Status": newRow.status = value; break;
        case "Action Logs (automatically updated from Column L)": newRow.action_logs = value; break;
        default: break;
      }
      return newRow;
    }));
    setEditing(prev => {
      const copy = { ...prev };
      if (copy[rowIdx]) delete copy[rowIdx][col];
      return copy;
    });
    // TODO: Send update to backend here
  };

  // Render editable or static cell
  const renderEditableCell = (row, col, rowIdx) => {
    const value = renderCell(row, col);
    const isEditing = editing[rowIdx]?.[col] !== undefined;
    if (value === '' || value === undefined || value === null) {
      return isEditing ? (
        <input
          className="w-full px-2 py-1 border rounded text-xs"
          value={editing[rowIdx]?.[col] || ''}
          autoFocus
          onChange={e => handleCellChange(rowIdx, col, e.target.value)}
          onBlur={() => handleCellSave(rowIdx, col)}
          onKeyDown={e => { if (e.key === 'Enter') handleCellSave(rowIdx, col); }}
        />
      ) : (
        <button
          className="text-blue-400 hover:underline text-xs"
          onClick={() => handleCellChange(rowIdx, col, '')}
        >
          + Add
        </button>
      );
    }
    return value;
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Taskbar actions={[{ label: 'Back to Dashboard', href: '/admin/dashboard' }]} />
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Inquiries Sheet</h1>
            <p className="mt-1 text-sm text-gray-500">All customer inquiries and actions, in an excel-like table.</p>
          </div>
        </div>
        {/* Full-width table container */}
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {columns.map(col => (
                  <th key={col} className="px-4 py-3 font-bold text-gray-700 whitespace-nowrap border-r last:border-r-0 text-center">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8 text-gray-400">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8 text-red-500">{error}</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8 text-gray-400">No inquiries found.</td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={row.inquiry_id || idx} className="hover:bg-blue-50 transition-colors">
                    {columns.map(col => (
                      <td key={col} className="px-4 py-2 border-r last:border-r-0 text-center text-gray-700 max-w-xs truncate" title={String(renderCell(row, col) ?? '')}>
                        {renderEditableCell(row, col, idx)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
} 