import { Pencil, Trash2 } from "lucide-react"
import CrudFormModal from "./CrudFormModal"
import SearchBar from "./SearchBar"
import FilterSelect from "./FilterSelect"
import Pagination from "./Pagination"

export default function DataTable({
    title,
    columns,
    data,
    loading,
    formSchema,
    onCreate,
    onDelete,
    onEdit,
    searchValue = "",
    onSearchChange,
    filterOptions = [],
    filterValue = "",
    onFilterChange,
    sortOptions = [],
    sortValue = "",
    onSortChange,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    itemsPerPage = 10,
    onItemsPerPageChange,
    onColumnSort,
}) {
    return (
        <div className="w-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <div className="flex items-center gap-4">
                        {onSearchChange && (
                            <SearchBar onChange={onSearchChange} />
                        )}
                        {onSortChange && sortOptions.length > 0 && (
                            <FilterSelect
                                options={sortOptions}
                                value={sortValue}
                                onChange={onSortChange}
                                placeholder="Ordenar por..."
                            />
                        )}
                        {onFilterChange && filterOptions.length > 0 && (
                            <FilterSelect
                                options={filterOptions}
                                value={filterValue}
                                onChange={onFilterChange}
                            />
                        )}
                        <CrudFormModal formSchema={formSchema} onSubmit={onCreate} />
                    </div>
                </div>

                {loading ? (
                    <p className="text-gray-600 mt-4">Cargando...</p>
                ) : (
                    <div className="mt-4">
                        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                            
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                                    <tr>
                                        {columns.map((col) => (
                                            <th
                                                key={col.key}
                                                className={`px-6 py-3 text-left font-medium ${
                                                    col.sortable && onColumnSort
                                                        ? "cursor-pointer hover:bg-gray-100 select-none"
                                                        : ""
                                                }`}
                                                onClick={() => col.sortable && onColumnSort?.(col.key)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {col.label}
                                                    {col.sortable && onColumnSort && (
                                                        <span className="text-xs text-gray-400">↕</span>
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                        <th className="px-6 py-3 text-right font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-50">
                                    {data.length > 0 ? (
                                        data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50/70 transition-colors"
                                            >
                                                {columns.map((col) => (
                                                    <td
                                                        key={col.key}
                                                        className="px-6 py-3 text-gray-700"
                                                    >
                                                        {item[col.key]}
                                                    </td>
                                                ))}

                                                <td className="px-6 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        
                                                        <button
                                                            onClick={() => onEdit?.(item)}
                                                            className="p-2 rounded-lg border border-gray-100 bg-white hover:bg-gray-100/60 transition shadow-sm"
                                                        >
                                                            <Pencil className="size-4 text-gray-600" />
                                                        </button>

                                                        <button
                                                            onClick={() => onDelete(item.id)}
                                                            className="p-2 rounded-lg border border-gray-100 bg-white hover:bg-red-50/60 transition shadow-sm"
                                                        >
                                                            <Trash2 className="size-4 text-red-600" />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={columns.length + 1}
                                                className="text-center py-10 text-gray-400 italic"
                                            >
                                                No hay registros
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                        {onPageChange && totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                                itemsPerPage={itemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
