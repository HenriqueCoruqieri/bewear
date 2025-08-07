"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import z from 'zod';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string("Senha inválida").min(8, "Senha inválida"),
});

type FormValues = z.infer<typeof formSchema>

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "", 
        },
  })

  async function onSubmit(values: FormValues) {
    await authClient.signIn.email({
        email: values.email,
        password: values.password,
        fetchOptions: {
            onSuccess: () => {
                router.push("/");
            },
            onError: (context) => {
                if(context.error.code == "USER_NOT_FOUND") {
                    toast.error("Email não encontrado");
                    return form.setError("email", {
                        message: "Email não encontrado",
                    })
                }
                if(context.error.code == "INVALID_EMAIL_OR_PASSWORD") {
                    toast.error("Email o usenha inválidos");
                    form.setError("email", {
                        message: "",
                    });
                    return form.setError("password", {
                        message: "Email ou senha inválidos",
                    });
                }
                toast.error(context.error.message);
            },
        },
    });
  }

  return (
    <>
        <Card className="w-full">
        <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
                Faça o login para continuar navegando
            </CardDescription>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="grid gap-6">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                        <Input placeholder="Digite a sua senha" type="password"{...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </CardContent>

                <CardFooter>
                 <Button type="submit">Entrar</Button>
                </CardFooter>
                </form>
            </Form>       
        </Card>    
    </>
  )
}

export default SignInForm;