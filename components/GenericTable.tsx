import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface GenericTableProps<T> {
  title: string;
  limit?: number;
  dataList: T[];
  headerList: string[];
  baseUrl: string;
  handleDelete: (id: string) => void;
  formatDate?: (date: string | Date) => string;
}

const GenericTable = <T extends { id: string }>({
  title = 'Items',
  limit,
  dataList,
  headerList,
  baseUrl,
  handleDelete,
  formatDate,
}: GenericTableProps<T>) => {
  // Filter the data based on the limit prop
  const filteredData = limit ? dataList.slice(0, limit) : dataList;

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <Link href={`${baseUrl}/0`}>
          <Button variant='link' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
            Add
          </Button>
        </Link>
      </div>
      <Table className="border border-slate-200 shadow-lg">
        <TableCaption>A list of recent {title.toLowerCase()}</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {headerList.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
            <TableHead className="text-center">Edit/Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              {headerList.map((header, index) => (
                <TableCell key={index}>
                  {typeof item[header.toLowerCase()] === 'object'
                    ? JSON.stringify(item[header.toLowerCase()])
                    : item[header.toLowerCase()]}
                </TableCell>
              ))}
              <TableCell className="flex justify-center space-x-2">
                <Link href={`${baseUrl}/${item.id}`}>
                  <Button variant='link' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant='link'
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenericTable;