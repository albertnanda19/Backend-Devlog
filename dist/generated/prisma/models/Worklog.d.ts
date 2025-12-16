import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorklogModel = runtime.Types.Result.DefaultSelection<Prisma.$WorklogPayload>;
export type AggregateWorklog = {
    _count: WorklogCountAggregateOutputType | null;
    _avg: WorklogAvgAggregateOutputType | null;
    _sum: WorklogSumAggregateOutputType | null;
    _min: WorklogMinAggregateOutputType | null;
    _max: WorklogMaxAggregateOutputType | null;
};
export type WorklogAvgAggregateOutputType = {
    timeSpent: number | null;
};
export type WorklogSumAggregateOutputType = {
    timeSpent: number | null;
};
export type WorklogMinAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    logDate: Date | null;
    activityType: string | null;
    summary: string | null;
    timeSpent: number | null;
    blockers: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type WorklogMaxAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    logDate: Date | null;
    activityType: string | null;
    summary: string | null;
    timeSpent: number | null;
    blockers: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type WorklogCountAggregateOutputType = {
    id: number;
    projectId: number;
    logDate: number;
    activityType: number;
    summary: number;
    timeSpent: number;
    blockers: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type WorklogAvgAggregateInputType = {
    timeSpent?: true;
};
export type WorklogSumAggregateInputType = {
    timeSpent?: true;
};
export type WorklogMinAggregateInputType = {
    id?: true;
    projectId?: true;
    logDate?: true;
    activityType?: true;
    summary?: true;
    timeSpent?: true;
    blockers?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type WorklogMaxAggregateInputType = {
    id?: true;
    projectId?: true;
    logDate?: true;
    activityType?: true;
    summary?: true;
    timeSpent?: true;
    blockers?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type WorklogCountAggregateInputType = {
    id?: true;
    projectId?: true;
    logDate?: true;
    activityType?: true;
    summary?: true;
    timeSpent?: true;
    blockers?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type WorklogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorklogWhereInput;
    orderBy?: Prisma.WorklogOrderByWithRelationInput | Prisma.WorklogOrderByWithRelationInput[];
    cursor?: Prisma.WorklogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorklogCountAggregateInputType;
    _avg?: WorklogAvgAggregateInputType;
    _sum?: WorklogSumAggregateInputType;
    _min?: WorklogMinAggregateInputType;
    _max?: WorklogMaxAggregateInputType;
};
export type GetWorklogAggregateType<T extends WorklogAggregateArgs> = {
    [P in keyof T & keyof AggregateWorklog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorklog[P]> : Prisma.GetScalarType<T[P], AggregateWorklog[P]>;
};
export type WorklogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorklogWhereInput;
    orderBy?: Prisma.WorklogOrderByWithAggregationInput | Prisma.WorklogOrderByWithAggregationInput[];
    by: Prisma.WorklogScalarFieldEnum[] | Prisma.WorklogScalarFieldEnum;
    having?: Prisma.WorklogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorklogCountAggregateInputType | true;
    _avg?: WorklogAvgAggregateInputType;
    _sum?: WorklogSumAggregateInputType;
    _min?: WorklogMinAggregateInputType;
    _max?: WorklogMaxAggregateInputType;
};
export type WorklogGroupByOutputType = {
    id: string;
    projectId: string;
    logDate: Date;
    activityType: string;
    summary: string;
    timeSpent: number | null;
    blockers: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: WorklogCountAggregateOutputType | null;
    _avg: WorklogAvgAggregateOutputType | null;
    _sum: WorklogSumAggregateOutputType | null;
    _min: WorklogMinAggregateOutputType | null;
    _max: WorklogMaxAggregateOutputType | null;
};
type GetWorklogGroupByPayload<T extends WorklogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorklogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorklogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorklogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorklogGroupByOutputType[P]>;
}>>;
export type WorklogWhereInput = {
    AND?: Prisma.WorklogWhereInput | Prisma.WorklogWhereInput[];
    OR?: Prisma.WorklogWhereInput[];
    NOT?: Prisma.WorklogWhereInput | Prisma.WorklogWhereInput[];
    id?: Prisma.UuidFilter<"Worklog"> | string;
    projectId?: Prisma.UuidFilter<"Worklog"> | string;
    logDate?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    activityType?: Prisma.StringFilter<"Worklog"> | string;
    summary?: Prisma.StringFilter<"Worklog"> | string;
    timeSpent?: Prisma.IntNullableFilter<"Worklog"> | number | null;
    blockers?: Prisma.StringNullableFilter<"Worklog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Worklog"> | Date | string | null;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
};
export type WorklogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    logDate?: Prisma.SortOrder;
    activityType?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrderInput | Prisma.SortOrder;
    blockers?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    project?: Prisma.ProjectOrderByWithRelationInput;
};
export type WorklogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    projectId_logDate?: Prisma.WorklogProjectIdLogDateCompoundUniqueInput;
    AND?: Prisma.WorklogWhereInput | Prisma.WorklogWhereInput[];
    OR?: Prisma.WorklogWhereInput[];
    NOT?: Prisma.WorklogWhereInput | Prisma.WorklogWhereInput[];
    projectId?: Prisma.UuidFilter<"Worklog"> | string;
    logDate?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    activityType?: Prisma.StringFilter<"Worklog"> | string;
    summary?: Prisma.StringFilter<"Worklog"> | string;
    timeSpent?: Prisma.IntNullableFilter<"Worklog"> | number | null;
    blockers?: Prisma.StringNullableFilter<"Worklog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Worklog"> | Date | string | null;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
}, "id" | "projectId_logDate">;
export type WorklogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    logDate?: Prisma.SortOrder;
    activityType?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrderInput | Prisma.SortOrder;
    blockers?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorklogCountOrderByAggregateInput;
    _avg?: Prisma.WorklogAvgOrderByAggregateInput;
    _max?: Prisma.WorklogMaxOrderByAggregateInput;
    _min?: Prisma.WorklogMinOrderByAggregateInput;
    _sum?: Prisma.WorklogSumOrderByAggregateInput;
};
export type WorklogScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorklogScalarWhereWithAggregatesInput | Prisma.WorklogScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorklogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorklogScalarWhereWithAggregatesInput | Prisma.WorklogScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Worklog"> | string;
    projectId?: Prisma.UuidWithAggregatesFilter<"Worklog"> | string;
    logDate?: Prisma.DateTimeWithAggregatesFilter<"Worklog"> | Date | string;
    activityType?: Prisma.StringWithAggregatesFilter<"Worklog"> | string;
    summary?: Prisma.StringWithAggregatesFilter<"Worklog"> | string;
    timeSpent?: Prisma.IntNullableWithAggregatesFilter<"Worklog"> | number | null;
    blockers?: Prisma.StringNullableWithAggregatesFilter<"Worklog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Worklog"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Worklog"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Worklog"> | Date | string | null;
};
export type WorklogCreateInput = {
    id?: string;
    logDate: Date | string;
    activityType: string;
    summary: string;
    timeSpent?: number | null;
    blockers?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    project: Prisma.ProjectCreateNestedOneWithoutWorklogsInput;
};
export type WorklogUncheckedCreateInput = {
    id?: string;
    projectId: string;
    logDate: Date | string;
    activityType: string;
    summary: string;
    timeSpent?: number | null;
    blockers?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type WorklogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    logDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activityType?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSpent?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    blockers?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    project?: Prisma.ProjectUpdateOneRequiredWithoutWorklogsNestedInput;
};
export type WorklogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    logDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activityType?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSpent?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    blockers?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type WorklogCreateManyInput = {
    id?: string;
    projectId: string;
    logDate: Date | string;
    activityType: string;
    summary: string;
    timeSpent?: number | null;
    blockers?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type WorklogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    logDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activityType?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSpent?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    blockers?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type WorklogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    logDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activityType?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSpent?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    blockers?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type WorklogListRelationFilter = {
    every?: Prisma.WorklogWhereInput;
    some?: Prisma.WorklogWhereInput;
    none?: Prisma.WorklogWhereInput;
};
export type WorklogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorklogProjectIdLogDateCompoundUniqueInput = {
    projectId: string;
    logDate: Date | string;
};
export type WorklogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    logDate?: Prisma.SortOrder;
    activityType?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    blockers?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type WorklogAvgOrderByAggregateInput = {
    timeSpent?: Prisma.SortOrder;
};
export type WorklogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    logDate?: Prisma.SortOrder;
    activityType?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    blockers?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type WorklogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    logDate?: Prisma.SortOrder;
    activityType?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    timeSpent?: Prisma.SortOrder;
    blockers?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type WorklogSumOrderByAggregateInput = {
    timeSpent?: Prisma.SortOrder;
};
export type WorklogCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.WorklogCreateWithoutProjectInput, Prisma.WorklogUncheckedCreateWithoutProjectInput> | Prisma.WorklogCreateWithoutProjectInput[] | Prisma.WorklogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.WorklogCreateOrConnectWithoutProjectInput | Prisma.WorklogCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.WorklogCreateManyProjectInputEnvelope;
    connect?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
};
export type WorklogUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.WorklogCreateWithoutProjectInput, Prisma.WorklogUncheckedCreateWithoutProjectInput> | Prisma.WorklogCreateWithoutProjectInput[] | Prisma.WorklogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.WorklogCreateOrConnectWithoutProjectInput | Prisma.WorklogCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.WorklogCreateManyProjectInputEnvelope;
    connect?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
};
export type WorklogUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.WorklogCreateWithoutProjectInput, Prisma.WorklogUncheckedCreateWithoutProjectInput> | Prisma.WorklogCreateWithoutProjectInput[] | Prisma.WorklogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.WorklogCreateOrConnectWithoutProjectInput | Prisma.WorklogCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.WorklogUpsertWithWhereUniqueWithoutProjectInput | Prisma.WorklogUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.WorklogCreateManyProjectInputEnvelope;
    set?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    disconnect?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    delete?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    connect?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    update?: Prisma.WorklogUpdateWithWhereUniqueWithoutProjectInput | Prisma.WorklogUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.WorklogUpdateManyWithWhereWithoutProjectInput | Prisma.WorklogUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.WorklogScalarWhereInput | Prisma.WorklogScalarWhereInput[];
};
export type WorklogUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.WorklogCreateWithoutProjectInput, Prisma.WorklogUncheckedCreateWithoutProjectInput> | Prisma.WorklogCreateWithoutProjectInput[] | Prisma.WorklogUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.WorklogCreateOrConnectWithoutProjectInput | Prisma.WorklogCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.WorklogUpsertWithWhereUniqueWithoutProjectInput | Prisma.WorklogUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.WorklogCreateManyProjectInputEnvelope;
    set?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    disconnect?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    delete?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    connect?: Prisma.WorklogWhereUniqueInput | Prisma.WorklogWhereUniqueInput[];
    update?: Prisma.WorklogUpdateWithWhereUniqueWithoutProjectInput | Prisma.WorklogUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.WorklogUpdateManyWithWhereWithoutProjectInput | Prisma.WorklogUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.WorklogScalarWhereInput | Prisma.WorklogScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type WorklogCreateWithoutProjectInput = {
    id?: string;
    logDate: Date | string;
    activityType: string;
    summary: string;
    timeSpent?: number | null;
    blockers?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type WorklogUncheckedCreateWithoutProjectInput = {
    id?: string;
    logDate: Date | string;
    activityType: string;
    summary: string;
    timeSpent?: number | null;
    blockers?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type WorklogCreateOrConnectWithoutProjectInput = {
    where: Prisma.WorklogWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorklogCreateWithoutProjectInput, Prisma.WorklogUncheckedCreateWithoutProjectInput>;
};
export type WorklogCreateManyProjectInputEnvelope = {
    data: Prisma.WorklogCreateManyProjectInput | Prisma.WorklogCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type WorklogUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.WorklogWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorklogUpdateWithoutProjectInput, Prisma.WorklogUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.WorklogCreateWithoutProjectInput, Prisma.WorklogUncheckedCreateWithoutProjectInput>;
};
export type WorklogUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.WorklogWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorklogUpdateWithoutProjectInput, Prisma.WorklogUncheckedUpdateWithoutProjectInput>;
};
export type WorklogUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.WorklogScalarWhereInput;
    data: Prisma.XOR<Prisma.WorklogUpdateManyMutationInput, Prisma.WorklogUncheckedUpdateManyWithoutProjectInput>;
};
export type WorklogScalarWhereInput = {
    AND?: Prisma.WorklogScalarWhereInput | Prisma.WorklogScalarWhereInput[];
    OR?: Prisma.WorklogScalarWhereInput[];
    NOT?: Prisma.WorklogScalarWhereInput | Prisma.WorklogScalarWhereInput[];
    id?: Prisma.UuidFilter<"Worklog"> | string;
    projectId?: Prisma.UuidFilter<"Worklog"> | string;
    logDate?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    activityType?: Prisma.StringFilter<"Worklog"> | string;
    summary?: Prisma.StringFilter<"Worklog"> | string;
    timeSpent?: Prisma.IntNullableFilter<"Worklog"> | number | null;
    blockers?: Prisma.StringNullableFilter<"Worklog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Worklog"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Worklog"> | Date | string | null;
};
export type WorklogCreateManyProjectInput = {
    id?: string;
    logDate: Date | string;
    activityType: string;
    summary: string;
    timeSpent?: number | null;
    blockers?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type WorklogUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    logDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activityType?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSpent?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    blockers?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type WorklogUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    logDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activityType?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSpent?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    blockers?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type WorklogUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    logDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activityType?: Prisma.StringFieldUpdateOperationsInput | string;
    summary?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSpent?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    blockers?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type WorklogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    logDate?: boolean;
    activityType?: boolean;
    summary?: boolean;
    timeSpent?: boolean;
    blockers?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["worklog"]>;
export type WorklogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    logDate?: boolean;
    activityType?: boolean;
    summary?: boolean;
    timeSpent?: boolean;
    blockers?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["worklog"]>;
export type WorklogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    logDate?: boolean;
    activityType?: boolean;
    summary?: boolean;
    timeSpent?: boolean;
    blockers?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["worklog"]>;
export type WorklogSelectScalar = {
    id?: boolean;
    projectId?: boolean;
    logDate?: boolean;
    activityType?: boolean;
    summary?: boolean;
    timeSpent?: boolean;
    blockers?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type WorklogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "projectId" | "logDate" | "activityType" | "summary" | "timeSpent" | "blockers" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["worklog"]>;
export type WorklogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type WorklogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type WorklogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type $WorklogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Worklog";
    objects: {
        project: Prisma.$ProjectPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        projectId: string;
        logDate: Date;
        activityType: string;
        summary: string;
        timeSpent: number | null;
        blockers: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["worklog"]>;
    composites: {};
};
export type WorklogGetPayload<S extends boolean | null | undefined | WorklogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorklogPayload, S>;
export type WorklogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorklogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorklogCountAggregateInputType | true;
};
export interface WorklogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Worklog'];
        meta: {
            name: 'Worklog';
        };
    };
    findUnique<T extends WorklogFindUniqueArgs>(args: Prisma.SelectSubset<T, WorklogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorklogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorklogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorklogFindFirstArgs>(args?: Prisma.SelectSubset<T, WorklogFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorklogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorklogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorklogFindManyArgs>(args?: Prisma.SelectSubset<T, WorklogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorklogCreateArgs>(args: Prisma.SelectSubset<T, WorklogCreateArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorklogCreateManyArgs>(args?: Prisma.SelectSubset<T, WorklogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorklogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorklogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorklogDeleteArgs>(args: Prisma.SelectSubset<T, WorklogDeleteArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorklogUpdateArgs>(args: Prisma.SelectSubset<T, WorklogUpdateArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorklogDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorklogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorklogUpdateManyArgs>(args: Prisma.SelectSubset<T, WorklogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorklogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorklogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorklogUpsertArgs>(args: Prisma.SelectSubset<T, WorklogUpsertArgs<ExtArgs>>): Prisma.Prisma__WorklogClient<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorklogCountArgs>(args?: Prisma.Subset<T, WorklogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorklogCountAggregateOutputType> : number>;
    aggregate<T extends WorklogAggregateArgs>(args: Prisma.Subset<T, WorklogAggregateArgs>): Prisma.PrismaPromise<GetWorklogAggregateType<T>>;
    groupBy<T extends WorklogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorklogGroupByArgs['orderBy'];
    } : {
        orderBy?: WorklogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorklogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorklogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorklogFieldRefs;
}
export interface Prisma__WorklogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorklogFieldRefs {
    readonly id: Prisma.FieldRef<"Worklog", 'String'>;
    readonly projectId: Prisma.FieldRef<"Worklog", 'String'>;
    readonly logDate: Prisma.FieldRef<"Worklog", 'DateTime'>;
    readonly activityType: Prisma.FieldRef<"Worklog", 'String'>;
    readonly summary: Prisma.FieldRef<"Worklog", 'String'>;
    readonly timeSpent: Prisma.FieldRef<"Worklog", 'Int'>;
    readonly blockers: Prisma.FieldRef<"Worklog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Worklog", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Worklog", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Worklog", 'DateTime'>;
}
export type WorklogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where: Prisma.WorklogWhereUniqueInput;
};
export type WorklogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where: Prisma.WorklogWhereUniqueInput;
};
export type WorklogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where?: Prisma.WorklogWhereInput;
    orderBy?: Prisma.WorklogOrderByWithRelationInput | Prisma.WorklogOrderByWithRelationInput[];
    cursor?: Prisma.WorklogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorklogScalarFieldEnum | Prisma.WorklogScalarFieldEnum[];
};
export type WorklogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where?: Prisma.WorklogWhereInput;
    orderBy?: Prisma.WorklogOrderByWithRelationInput | Prisma.WorklogOrderByWithRelationInput[];
    cursor?: Prisma.WorklogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorklogScalarFieldEnum | Prisma.WorklogScalarFieldEnum[];
};
export type WorklogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where?: Prisma.WorklogWhereInput;
    orderBy?: Prisma.WorklogOrderByWithRelationInput | Prisma.WorklogOrderByWithRelationInput[];
    cursor?: Prisma.WorklogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorklogScalarFieldEnum | Prisma.WorklogScalarFieldEnum[];
};
export type WorklogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorklogCreateInput, Prisma.WorklogUncheckedCreateInput>;
};
export type WorklogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorklogCreateManyInput | Prisma.WorklogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorklogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    data: Prisma.WorklogCreateManyInput | Prisma.WorklogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorklogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorklogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorklogUpdateInput, Prisma.WorklogUncheckedUpdateInput>;
    where: Prisma.WorklogWhereUniqueInput;
};
export type WorklogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorklogUpdateManyMutationInput, Prisma.WorklogUncheckedUpdateManyInput>;
    where?: Prisma.WorklogWhereInput;
    limit?: number;
};
export type WorklogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorklogUpdateManyMutationInput, Prisma.WorklogUncheckedUpdateManyInput>;
    where?: Prisma.WorklogWhereInput;
    limit?: number;
    include?: Prisma.WorklogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorklogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where: Prisma.WorklogWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorklogCreateInput, Prisma.WorklogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorklogUpdateInput, Prisma.WorklogUncheckedUpdateInput>;
};
export type WorklogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where: Prisma.WorklogWhereUniqueInput;
};
export type WorklogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorklogWhereInput;
    limit?: number;
};
export type WorklogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
};
export {};
