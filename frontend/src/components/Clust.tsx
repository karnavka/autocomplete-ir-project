import "./Clust.css"
type Cluster = {
  clusterId: number;
  documents: string[];
};

export const Clust = ({ cluster }: { cluster: Cluster }) => {
  return (
    <>
    <div className="clust">
        {cluster.documents.map((doc, index) => (
          <div key={index}>{doc}</div>
        ))}
    </div>
        </>

  );
};