import { Children, TableProps } from '@/@types';

const Table = ({ children, headers }: TableProps) => {
    return (
        <div className="w-full overflow-x-hidden max-h-80 mt-8">
            <table className="w-full flex flex-col items-center justify-center">
                <thead className='sticky top-0 flex justify-center items-center'>
                    <tr className="flex justify-center items-center bg-white m-1 p-4 w-80 h-14 rounded-md text-textPrimary">
                        {headers.map((header, index) => (
                            <th key={index} className="py-2">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='flex justify-center items-center flex-col'>
                    {children}
                </tbody>
            </table>
        </div>
    );
};

const TableRow = ({ children }: Children) => {
    return <tr>{children}</tr>;
};

const TableCell = ({ children }: Children) => {
    return <td>{children}</td>;
};

export { Table, TableRow, TableCell };

