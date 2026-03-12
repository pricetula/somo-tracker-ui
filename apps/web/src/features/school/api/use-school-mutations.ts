import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchools, updateSchool } from "@/features/school/api/actions";
import type { AddSchoolRequest, UpdateSchoolRequest, School } from "@/features/school/types";
import type { ActionResult } from "@/types/action-result";

export function useCreateSchools() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: AddSchoolRequest[]) => createSchools(body),
        onMutate: async (body) => {
            await queryClient.cancelQueries({ queryKey: ["schools"] });
            const previous = queryClient.getQueryData<ActionResult<School[]>>(["schools"]);
            const optimistic: School[] = body.map((s) => ({
                ...s,
                id: `optimistic-${Date.now()}`,
            }));
            queryClient.setQueryData<ActionResult<School[]>>(["schools"], (old) => ({
                success: true,
                data: [...(old?.success ? old.data : []), ...optimistic],
            }));
            return { previous };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(["schools"], ctx.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["schools"] });
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
}

export function useUpdateSchool() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: UpdateSchoolRequest) => updateSchool(body),
        onMutate: async (body) => {
            await queryClient.cancelQueries({ queryKey: ["schools"] });
            const previous = queryClient.getQueryData<ActionResult<School[]>>(["schools"]);
            queryClient.setQueryData<ActionResult<School[]>>(["schools"], (old) => ({
                success: true,
                data: (old?.success ? old.data : []).map((s: School) =>
                    s.id === body.id ? { ...s, ...body } : s
                ),
            }));
            if (body.id) {
                const previousSingle = queryClient.getQueryData<ActionResult<School>>([
                    "schools",
                    body.id,
                ]);
                queryClient.setQueryData<ActionResult<School>>(["schools", body.id], (old) =>
                    old?.success ? { success: true, data: { ...old.data, ...body } } : old
                );
                return { previous, previousSingle, id: body.id };
            }
            return { previous };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(["schools"], ctx.previous);
            if (ctx?.previousSingle && ctx.id)
                queryClient.setQueryData(["schools", ctx.id], ctx.previousSingle);
        },
        onSettled: (_data, _err, vars) => {
            queryClient.invalidateQueries({ queryKey: ["schools"] });
            if (vars.id) queryClient.invalidateQueries({ queryKey: ["schools", vars.id] });
        },
    });
}
