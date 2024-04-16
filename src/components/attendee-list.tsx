import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "./button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") || "";
    }

    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });
  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const totalPages = useMemo(() => {
    return Math.ceil(total / 10);
  }, [total]);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));
    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTotal(data.total);
        setAttendees(data.attendees);
      });
  }, [page, search]);

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
  }

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", String(event.target.value));
    window.history.pushState({}, "", url);
    setSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            type="text"
            placeholder="Buscar participantes..."
            className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm ring-0 focus:ring-0"
            onChange={onSearchInputChange}
            value={search}
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="outline-none size-4 bg-black/20 rounded border border-white/10 ring-0 focus:ring-0"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>

        <tbody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id} className="hover:bg-white/5">
              <TableCell>
                <input
                  type="checkbox"
                  className="outline-none size-4 bg-black/20 rounded border border-white/10 ring-0 focus:ring-0"
                />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
              <TableCell>
                {attendee.checkedInAt ? (
                  dayjs().to(attendee.checkedInAt)
                ) : (
                  <span className="text-zinc-400">Não faz check-in</span>
                )}
              </TableCell>
              <TableCell>
                <Button transparent>
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <Button
                    onClick={goToFirstPage}
                    disabled={page === 1}
                    data-testid="first-button"
                  >
                    <ChevronsLeft className="size-4" />
                  </Button>
                  <Button
                    onClick={goToPreviousPage}
                    disabled={page === 1}
                    data-testid="prev-button"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                    data-testid="next-button"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                  <Button
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                    data-testid="last-button"
                  >
                    <ChevronsRight className="size-4" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
