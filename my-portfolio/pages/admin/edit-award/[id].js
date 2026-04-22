import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AwardForm from '../../../components/AwardForm';

export default function EditAward() {
  const router = useRouter();
  const { id } = router.query;
  const [award, setAward] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/awards/${id}`)
        .then((res) => res.json())
        .then((data) => setAward(data))
        .catch(() => {
        // Log the error to the browser's console
        console.error("Error fetching projects:");
      });
    }
  }, [id]);

  if (!award) return <div className="p-8 text-center pt-24">Loading...</div>;

  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Award</h1>
      <AwardForm awardToEdit={award} />
    </div>
  );
}
