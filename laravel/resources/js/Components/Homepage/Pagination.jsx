import {Link} from "@inertiajs/react";

const Pagination = ({ meta }) => {
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div>
            <div className="join">
                {prev && <Link href={prev} className="join-item btn btn-outline">«</Link>}
                <Link className="join-item btn btn-outline">{current}</Link>
                {next && <Link href={next} className="join-item btn btn-outline">»</Link>}
            </div>
        </div>
    )
}

export default Pagination;