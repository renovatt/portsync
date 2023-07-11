'use client'

import { Loader } from "@/components/Helper/Loader";
import Dashboard from "@/components/Dashboard";
import useFetchData from "@/hooks/useFetchData";

export default function Home() {
  const {
    loading,
    error } = useFetchData();

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Deu erro</p>
  }

  return <Dashboard />
}
