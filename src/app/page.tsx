'use client'

import Dashboard from "@/components/Dashboard";
import { Loader } from "@/components/Helper/Loader";
import { useGlobalContext } from "@/components/Providers/ContextProvider";

export default function Home() {
  const {
    loading,
    error } = useGlobalContext();

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Deu erro</p>
  }

  return <Dashboard />
}
