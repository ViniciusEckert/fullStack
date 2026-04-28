"use server"

import { Aluno } from "@/interfaces/alunos";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAluno(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/aluno/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    
  const data = await response.json()

  if(response.status === 401) {
    redirect("/login")
  }

  return data as Aluno
}
