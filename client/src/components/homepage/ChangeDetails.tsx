import { translations } from '../../hooks/useChanges';
import { DifferenceKind, IDifference, IScenario, ISymbol } from '../../shared/interfaces';

interface ChangeDetailsProps {
    difference: IDifference;
    path: string;
}

interface IFormattedObjectProps {
    lhs: any;
    rhs: any;
    path: string;
    kind: DifferenceKind | undefined;
}

type FormattedObjectKey =
    | 'name'
    | 'classification'
    | 'notion'
    | 'synonyms'
    | 'impacts'
    | 'title'
    | 'goal'
    | 'exceptions'
    | 'actors'
    | 'context'
    | 'resources'
    | 'episodes';

const FormattedEntity = ({ lhs, rhs, path, kind }: IFormattedObjectProps) => {
    let rhsKeys;
    let lhsKeys;
    let isRhsArray = Array.isArray(rhs);
    let isLhsArray = Array.isArray(lhs);

    const formatArray = (arr: any) => {
        return arr?.map((item: any) => item?.description?.toString() || item?.name?.toString()).join(', ') || 'nenhum';
    };

    const formatObject = (obj: any) => {
        return (
            <>
                <br />
                {' -'}
                {Object.keys(obj)
                    .filter((key) => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(key))
                    .map((key) => `${translations[key]?.value}: ${obj[key]}`)
                    .join('\n -')}
            </>
        );
    };

    if (isRhsArray) {
    } else {
        rhsKeys = Object.keys(rhs || {}).filter(
            (key) => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(key)
        ) as FormattedObjectKey[];
    }
    if (isLhsArray) {
    } else {
        lhsKeys = Object.keys(lhs || {}).filter(
            (key) => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(key)
        ) as FormattedObjectKey[];
    }

    return (
        <pre>
            {kind === 'N' && isRhsArray && (
                <small>
                    {translations[path].value} adicionad{translations[path].gender}s: {<span className='new'>{formatArray(rhs)}</span>}
                </small>
            )}
            {kind === 'N' && isLhsArray && (
                <small>
                    {translations[path].value} removid{translations[path].gender}s:{' '}
                    {lhs?.map((item: any, index: number) => {
                        return (
                            <span className='old' key={index}>
                                {item?.name?.toString() || item?.description?.toString() || ''}
                                <br />
                            </span>
                        );
                    })}
                </small>
            )}
            {kind === 'N' && !isRhsArray && (
                <small>
                    {translations[path].value} adicionad{translations[path].gender}
                    {[
                        'restrictions',
                        'impacts',
                        'synonyms',
                        'actors',
                        'exceptions',
                        'resources',
                        'restriction',
                        'type',
                        'description',
                    ].includes(path) ? (
                        's: '
                    ) : (
                        <>
                            :<br />
                        </>
                    )}
                    {[
                        'restrictions',
                        'impacts',
                        'synonyms',
                        'actors',
                        'exceptions',
                        'resources',
                        'restriction',
                        'type',
                        'description',
                    ].includes(path)
                        ? rhsKeys
                              ?.filter((key) => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(key))
                              .map((key) => {
                                  return (
                                      <span className='new' key={key}>
                                          {rhs[key]?.toString() || ''}
                                      </span>
                                  );
                              })
                        : rhsKeys
                              ?.filter((key) => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(key))
                              .map((key) => {
                                  return (
                                      <span className='new' key={key}>
                                          {translations[key]?.value}: {''}
                                          {Array.isArray(rhs[key])
                                              ? formatArray(rhs[key])
                                              : typeof rhs[key] == 'object'
                                                ? formatObject(rhs[key])
                                                : rhs[key]?.toString() || ''}
                                          <br />
                                      </span>
                                  );
                              })}
                </small>
            )}

            {kind === 'D' && !isLhsArray && (
                <small>
                    {translations[path].value} removid{translations[path].gender}
                    {[
                        'restrictions',
                        'impacts',
                        'synonyms',
                        'actors',
                        'exceptions',
                        'resources',
                        'restriction',
                        'type',
                        'description',
                    ].includes(path) ? (
                        's: '
                    ) : (
                        <>
                            :<br />
                        </>
                    )}
                    {[
                        'restrictions',
                        'impacts',
                        'synonyms',
                        'actors',
                        'exceptions',
                        'resources',
                        'restriction',
                        'type',
                        'description',
                    ].includes(path)
                        ? lhsKeys
                              ?.filter((key) => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(key))
                              .map((key) => {
                                  return (
                                      <span className='old' key={key}>
                                          {lhs[key]?.toString()}
                                      </span>
                                  );
                              })
                        : lhsKeys
                              ?.filter((key) => !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(key))
                              .map((key) => {
                                  return (
                                      <span className='old' key={key}>
                                          {translations[key].value}: {''}
                                          {Array.isArray(lhs[key])
                                              ? formatArray(lhs[key])
                                              : typeof lhs[key] == 'object'
                                                ? formatObject(lhs[key])
                                                : lhs[key]?.toString()}
                                          <br />
                                      </span>
                                  );
                              })}
                </small>
            )}
        </pre>
    );
};

export const ChangeDetails = ({ difference, path }: ChangeDetailsProps) => {
    const isDeletedAtChange = difference?.kind === 'E' && difference?.path[difference?.path.length - 1] === 'deletedAt';
    return (
        <div className='differences flex column'>
            {difference?.kind === 'E' ||
                (difference?.kind === 'D' &&
                    !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(path) &&
                    !isDeletedAtChange && (
                        <pre>
                            <small className='old line-through'>{`${translations[path]?.value}: ${difference.lhs?.toString() || ''}`}</small>
                            <small className='new'>{`${translations[path]?.value}: ${difference.rhs?.toString() || ''}`}</small>
                        </pre>
                    ))}
            {difference?.kind === 'E' &&
                !['id', 'createdAt', 'updatedAt', 'deletedAt', 'project'].includes(path) &&
                isDeletedAtChange &&
                typeof difference?.rhs == 'string' && (
                    <small className='old'>
                        {`Removido em ${new Date(difference?.rhs || '').toLocaleDateString('pt-br')} às
                    ${new Date(difference?.rhs || '').toLocaleTimeString('pt-br')}`}
                    </small>
                )}
            {difference?.kind === 'A' && (
                <FormattedEntity
                    kind={difference.item?.kind}
                    path={difference.path[difference?.path.length - 1]}
                    lhs={difference?.item?.lhs}
                    rhs={difference?.item?.rhs}
                ></FormattedEntity>
            )}
            {difference?.kind === 'N' && (
                <FormattedEntity
                    kind={difference.kind}
                    path={difference.path[difference?.path.length - 1]}
                    lhs={difference?.lhs}
                    rhs={difference?.rhs}
                ></FormattedEntity>
            )}
        </div>
    );
};
