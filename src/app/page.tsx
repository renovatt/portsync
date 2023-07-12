'use client'

import Dashboard from "@/components/Dashboard";
import { Loader } from "@/components/Helper/Loader";
import { useGlobalContext } from "@/hooks/useContext";

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
