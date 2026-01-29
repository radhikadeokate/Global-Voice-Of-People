from fastapi import APIRouter, Query, HTTPException
from app.services.dashboard_service import get_dashboard_overview
from app.schemas.dashboard import DashboardResponse

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/overview",
    summary="Dashboard overview with aggregated AI insights",
    response_model=DashboardResponse
)
def dashboard_overview(
    topic: str = Query(..., description="Topic to analyze"),
    lang: str = Query("en", description="Language code"),
    max_results: int = Query(10, ge=1, le=20),
):

    try:
        return get_dashboard_overview(
            topic=topic,
            lang=lang,
            max_results=max_results
        )
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Dashboard service failed: {str(e)}"
        )
