mv ../.git/hooks/pre-commit ../.git/hooks/pre-commit.local 2>/dev/null
cp pre-commit ../.git/hooks
chmod +x ../.git/hooks/*
