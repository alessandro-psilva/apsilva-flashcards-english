// Ponte pros hooks do React. Carregado primeiro — os arquivos seguintes
// contam com useState/useMemo/useEffect já disponíveis como globais,
// sem precisar importar nada (o app roda sem build, direto no navegador).
const { useState, useMemo, useEffect } = React;
