import React, { Suspense } from "react";
import NewReceiptEntries from "./_components/newReceiptsEntries";

export default function page() {
  return (
    <Suspense>
      <NewReceiptEntries />;
    </Suspense>
  );
}
